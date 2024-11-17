// Функция для переключения на светлый режим
function setLightMode() {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";

    // Применяем светлый фон к блоку профиля
    const profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
        profileContainer.style.backgroundColor = "white";
        profileContainer.style.color = "black";

        // Применяем стили к вложенным элементам
        profileContainer.querySelectorAll('*').forEach(el => {
            el.style.color = "black";
        });
    }

    // Сохраняем настройки в localStorage
    localStorage.setItem("theme", "light");
}

// Функция для переключения на темный режим
function setDarkMode() {
    document.body.style.backgroundColor = "#333";
    document.body.style.color = "white";

    // Применяем темный фон к блоку профиля
    const profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
        profileContainer.style.backgroundColor = "#444";
        profileContainer.style.color = "white";

        // Применяем стили к вложенным элементам
        profileContainer.querySelectorAll('*').forEach(el => {
            el.style.color = "white";
        });
    }

    // Сохраняем настройки в localStorage
    localStorage.setItem("theme", "dark");
}

// Функция для загрузки темы при загрузке страницы
function loadTheme() {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        setDarkMode();
    } else {
        setLightMode();
    }
}

// Выполняем загрузку темы при загрузке страницы
document.addEventListener("DOMContentLoaded", loadTheme);


// Функция загрузки данных в профиле
function loadProfileData() {
    // Получаем данные из localStorage
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    // Если данные есть, отображаем их
    if (username && email) {
        document.getElementById("profile-username").textContent = username;
        document.getElementById("profile-email").textContent = email;
    } else {
        // Если данных нет, перенаправляем на страницу логина
        window.location.href = "index.html";
    }
}

// Функция выхода из профиля
function handleLogout() {
    // Удаляем данные из localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    // Возвращаемся на страницу логина
    window.location.href = "index.html";
}

// Загружаем данные при открытии страницы
loadProfileData();

// Загрузка данных пользователя
function loadProfile() {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    if (username && email) {
        document.getElementById("profile-username").textContent = username;
        document.getElementById("profile-email").textContent = email;
    }
}

// Функция для выхода
function logout() {
    localStorage.clear(); // Очищаем все данные
    window.location.href = "index.html"; // Перенаправляем на страницу входа
}

// Функция для редактирования профиля (дополнительно)
function editProfile() {
    alert("Функция редактирования профиля пока не реализована.");
}