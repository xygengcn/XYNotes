// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
#[cfg(debug_assertions)] // only include this code on debug builds
fn open_devtools(app_handle: tauri::AppHandle, flag: bool) {
    if flag {
        app_handle.get_window("main").unwrap().open_devtools(); // `main` is the first window from tauri.conf.json without an explicit label
    } else {
        app_handle.get_window("main").unwrap().close_devtools();
    }
}

use tauri::Manager;
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

fn main() {
    // 添加mac顶部菜单
    let quit = CustomMenuItem::new("quit".to_string(), "退出");
    let submenu = Submenu::new("XY笔记", Menu::new().add_item(quit));
    let menu = Menu::new()
        .add_native_item(MenuItem::Copy)
        .add_item(CustomMenuItem::new("hide", "Hide"))
        .add_submenu(submenu);
    tauri::Builder::default()
        .menu(menu)
        .on_menu_event(|event| match event.menu_item_id() {
            "quit" => {
                std::process::exit(0);
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![open_devtools])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
