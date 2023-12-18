// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
#[cfg(any(debug_assertions, feature = "devtools"))]
fn open_devtools(app_handle: tauri::AppHandle, label: String, flag: bool) {
    let window = app_handle.get_window(&label).unwrap();
    if flag || !window.is_devtools_open() {
        window.open_devtools();
    } else {
        window.close_devtools();
    }
}

use tauri::Manager;
use tauri::{
    AboutMetadata, CustomMenuItem, Menu, MenuItem, RunEvent, Submenu, SystemTray, SystemTrayEvent,
    SystemTrayMenu, WindowEvent,
};

fn main() {
    // 添加mac顶部菜单
    let about_menu = Submenu::new(
        "About",
        Menu::new()
            .add_native_item(MenuItem::About("".to_string(), AboutMetadata::default()))
            .add_item(CustomMenuItem::new("quit", "Quit")),
    );
    let edit_menu = Submenu::new(
        "Edit",
        Menu::new()
            .add_native_item(MenuItem::Undo)
            .add_native_item(MenuItem::Redo)
            .add_native_item(MenuItem::Cut)
            .add_native_item(MenuItem::Copy)
            .add_native_item(MenuItem::Paste)
            .add_native_item(MenuItem::SelectAll),
    );
    let menu = Menu::new().add_submenu(about_menu).add_submenu(edit_menu);

    let tray_menu = SystemTrayMenu::new();
    // .add_item(CustomMenuItem::new("quit".to_string(), "Quit"))
    // .add_native_item(SystemTrayMenuItem::Separator)
    // .add_item(CustomMenuItem::new("hide".to_string(), "Hide"));
    let tray = SystemTray::new().with_menu(tray_menu);

    // app
    let app = tauri::Builder::default()
        .menu(menu)
        .on_menu_event(|event| match event.menu_item_id() {
            "quit" => {
                // emit event to JS and quit from there after cleanup
                event.window().emit("quit-event", {}).unwrap();
            }
            _ => {}
        })
        .system_tray(tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick { .. } => {
                let window = match app.get_window("main") {
                    Some(window) => match window.is_visible().expect("winvis") {
                        true => {
                            window.hide().expect("winhide");
                            return;
                        }
                        false => window,
                    },
                    None => return,
                };
                #[cfg(not(target_os = "macos"))]
                {
                    window.show().unwrap();
                }
                window.set_focus().unwrap();
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![open_devtools])
        .build(tauri::generate_context!())
        .expect("error while running tauri application");

    // 退出事件
    app.run(|app_handle, e| match e {
        // Triggered when a window is trying to close
        RunEvent::WindowEvent { label, event, .. } => match event {
            WindowEvent::CloseRequested { api, .. } => {
                let app_handle = app_handle.clone();
                let window = app_handle.get_window(&label).unwrap();
                window.emit("quit-event", {}).unwrap();
                api.prevent_close();
            }
            _ => {}
        },
        _ => {}
    })
}
