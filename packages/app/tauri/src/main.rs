// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
#[cfg(any(debug_assertions, feature = "devtools"))]
fn open_devtools(app_handle: tauri::AppHandle, label: String, flag: bool) {
    let window = app_handle.get_webview_window(&label).unwrap();
    if flag || !window.is_devtools_open() {
        window.open_devtools();
    } else {
        window.close_devtools();
    }
}

use tauri::Manager;
use tauri::{
    image::Image,
    tray::{ClickType, TrayIconBuilder},
    ActivationPolicy,
};
fn main() {
    let _app = tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            // mac
            #[cfg(target_os = "macos")]
            {
                app.set_activation_policy(ActivationPolicy::Accessory);
            }

            // 托盘
            let _tray = TrayIconBuilder::new()
                .icon(Image::from_path("./icons/tray.png")?)
                .on_tray_icon_event(|tray, event| {
                    if event.click_type == ClickType::Left {
                        println!("[WindowEvent] on_tray_icon_event {:?}", event.click_type);
                        let app = tray.app_handle();
                        let window = app.get_webview_window("main").unwrap();
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                })
                .build(app)?;

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![open_devtools])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
