// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
#[cfg(any(debug_assertions))]
fn open_devtools(app_handle: tauri::AppHandle, label: String, flag: bool) {
    let window = app_handle.get_webview_window(&label).unwrap();
    if flag || !window.is_devtools_open() {
        window.open_devtools();
    } else {
        window.close_devtools();
    }
}
use tauri::Manager;
use tauri::{ActivationPolicy, WindowEvent};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![open_devtools])
        .setup(|app| {
            // mac
            #[cfg(target_os = "macos")]
            {
                app.set_activation_policy(ActivationPolicy::Accessory);
            }
            Ok(())
        })
        // 窗口事件
        .on_window_event(|window, event| match event {
            WindowEvent::CloseRequested {} => {
                println!("[WindowEvent] CloseRequested {}", window.label());
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
