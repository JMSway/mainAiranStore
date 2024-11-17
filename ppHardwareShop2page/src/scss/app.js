document.addEventListener('DOMContentLoaded', function() {
    // 1. Интеграция с Weather API
    const apiKey = '793f49e14bfb73d03e33c53a3b7e41fd'; // Ваш API-ключ
    const city = 'Astana'; // Название города (можно сделать динамическим)
    const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(weatherEndpoint)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Ошибка получения данных о погоде:', error);
        });

    function displayWeather(data) {
        const weatherContainer = document.getElementById('weather-container');
        if (weatherContainer) {
            const temp = data.main.temp;
            const weatherDescription = data.weather[0].description;
            weatherContainer.innerHTML = `
                <h3>Погода в ${city}</h3>
                <p>Температура: ${temp}°C</p>
                <p>Описание: ${weatherDescription}</p>
            `;
        }
    }

    // 2. Факты и кнопка "Загрузить больше фактов"
    const facts = [
        "Факт 1: Строительные материалы сделаны из различных природных материалов.",
        "Факт 2: Кирпичи - это один из самых древних строительных материалов.",
        "Факт 3: Древесина используется в строительстве уже тысячи лет.",
        "Факт 4: Металлы, такие как сталь, широко используются в строительстве.",
        "Факт 5: Бетон изобретён римлянами.",
        "Факт 6: Современные технологии позволяют создавать экологичные материалы.",
        "Факт 7: Пластик также используется в строительстве, например, для труб.",
        "Факт 8: Керамика используется для кровельных покрытий и декора.",
        "Факт 9: Пенобетон - отличный материал для утепления.",
        "Факт 10: Экологичные стройматериалы пользуются всё большей популярностью."
    ];
    
    let currentFactIndex = 0; // Индекс, указывающий на текущий факт
    let factsDisplayedCount = 1; // Счётчик показанных фактов
    const loadMoreButton = document.getElementById('load-more');
    const factsContainer = document.getElementById('facts-container');

    // Событие на кнопку "Загрузить больше фактов"
    loadMoreButton.addEventListener('click', function() {
        if (factsContainer) {
            // Добавляем следующий факт
            const factElement = document.createElement('p');
            factElement.textContent = facts[currentFactIndex];
            factElement.classList.add('fact-item'); // Класс для удобства стилизации
            factsContainer.appendChild(factElement);

            // Обновляем индекс для следующего клика
            currentFactIndex = (currentFactIndex + 1) % facts.length;
            factsDisplayedCount++;

            // Если показали 5 фактов, скрываем кнопку и контейнер до следующего нажатия
            if (factsDisplayedCount === 5) {
                loadMoreButton.style.display = 'none';
                setTimeout(() => {
                    factsContainer.innerHTML = "";
                    factsDisplayedCount = 0; // Сбрасываем счётчик
                    loadMoreButton.style.display = 'block'; // Показываем кнопку снова
                }, 3000); // Задержка 3 секунды перед скрытием фактов
            }
        } else {
            console.error('Контейнер для фактов не найден.');
        }
    });

    // 3. Кнопка для показа времени
    const showTimeButton = document.getElementById('show-time');
    const hideTimeButton = document.createElement('button');
    hideTimeButton.textContent = "Скрыть время";
    hideTimeButton.style.display = 'none';
    showTimeButton.parentNode.insertBefore(hideTimeButton, showTimeButton.nextSibling);

    let intervalId;

    showTimeButton.addEventListener('click', function() {
        const timeDisplay = document.getElementById('time');

        intervalId = setInterval(function() {
            const currentTime = new Date().toLocaleTimeString();
            timeDisplay.textContent = `Текущее время: ${currentTime}`;
        }, 1000);

        showTimeButton.style.display = 'none';
        hideTimeButton.style.display = 'inline-block';
    });

    hideTimeButton.addEventListener('click', function() {
        const timeDisplay = document.getElementById('time');
        clearInterval(intervalId);
        timeDisplay.textContent = '';

        hideTimeButton.style.display = 'none';
        showTimeButton.style.display = 'inline-block';
    });

    // 4. Рейтинг со звездами
    const stars = document.querySelectorAll('.star');
    let currentRating = 0;
    let isRatingFinal = false;

    function setRating(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
        currentRating = rating;
    }

    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            if (!isRatingFinal) {
                setRating(index + 1);
                console.log(`Пользователь выбрал рейтинг: ${index + 1}`);
                isRatingFinal = true; // Фиксируем рейтинг после нажатия
            }
        });

        star.addEventListener('mouseover', function() {
            if (!isRatingFinal) {
                setRating(index + 1);
            }
        });

        star.addEventListener('mouseout', function() {
            if (!isRatingFinal) {
                setRating(currentRating);
            }
        });
    });

    document.getElementById('dark-mode').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode'); // Добавляет/удаляет класс dark-mode
    });

    document.getElementById('light-mode').addEventListener('click', function() {
        document.body.classList.remove('dark-mode'); // Убедиться, что класс dark-mode удаляется
    });


    // Проверяем сохранённую тему в localStorage
    const storedMode = localStorage.getItem('theme');
    if (storedMode) {
        document.body.className = storedMode;
    } else {
        document.body.className = 'light-mode';
    }

    // Переключение на светлый режим
    lightModeButton.addEventListener('click', function() {
        document.body.className = 'light-mode';
        localStorage.setItem('theme', 'light-mode');
    });

    // Переключение на тёмный режим
    darkModeButton.addEventListener('click', function() {
        document.body.className = 'dark-mode';
        localStorage.setItem('theme', 'dark-mode');
    });

});



function handleLogin(event) {
    event.preventDefault(); // Останавливаем стандартное поведение формы

    // Получение значений из полей формы
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Проверка на заполненность всех полей
    if (!username || !email || !password) {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    // Проверка длины пароля
    if (password.length < 8) {
        alert("Пароль должен быть не менее 8 символов.");
        return;
    }

    try {
        // Сохранение данных пользователя в localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        alert("Данные успешно сохранены!");
    } catch (error) {
        alert("Ошибка сохранения данных в localStorage.");
        console.error("LocalStorage Error: ", error);
        return;
    }

    // Переход к отображению профиля
    displayProfile();
}

// Функция отображения профиля
function displayProfile() {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    if (username && email) {
        document.getElementById("profile-username").textContent = username;
        document.getElementById("profile-email").textContent = email;

        // Переключение видимости контейнеров
        toggleVisibility("login-container", false);
        toggleVisibility("profile-container", true);
    } else {
        console.error("Данные профиля не найдены.");
    }
}



// Функция для выхода
function handleLogout() {
    // Удаляем данные из localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    alert("Вы вышли из профиля!");

    // Переключение видимости контейнеров
    toggleVisibility("profile-container", false);
    toggleVisibility("login-container", true);
}

// Функция для переключения видимости элементов
function toggleVisibility(elementId, isVisible) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = isVisible ? "block" : "none";
    } else {
        console.error(`Элемент с ID "${elementId}" не найден.`);
    }
}

// Загрузка профиля при загрузке страницы
window.onload = function () {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    if (username && email) {
        displayProfile(); // Отображаем профиль, если данные есть
    } else {
        toggleVisibility("login-container", true); // Показываем форму входа
    }
};
function loadProfile() {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    if (username && email) {
        // Если данные есть, показываем профиль
        document.getElementById("login-container").style.display = "none";
        document.getElementById("profile-container").style.display = "block";

        // Отображаем данные профиля
        document.getElementById("profile-username").textContent = username;
        document.getElementById("profile-email").textContent = email;
    } else {
        // Если данных нет, показываем форму логина
        document.getElementById("login-container").style.display = "block";
        document.getElementById("profile-container").style.display = "none";
    }
}

// Загрузка профиля при загрузке страницы
loadProfile();


// Функция для переключения видимости пароля
function togglePasswordVisibility() {
    const passwordField = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        togglePassword.src = "eye-icon-open.png"; // Добавьте путь к изображению для "показать пароль"
    } else {
        passwordField.type = "password";
        togglePassword.src = "eye-icon.png"; // Добавьте путь к изображению для "скрыть пароль"
    }
}

// Загрузка профиля при загрузке страницы
window.onload = function () {
    displayProfile(); // Проверяем данные в localStorage и отображаем профиль, если они есть
};



// Переключение темы
function toggleTheme(isDark) {
    const body = document.body;
    const containers = document.querySelectorAll(".theme-light, .theme-dark");

    containers.forEach(container => {
        if (isDark) {
            container.classList.remove("theme-light");
            container.classList.add("theme-dark");
        } else {
            container.classList.remove("theme-dark");
            container.classList.add("theme-light");
        }
    });
}

document.getElementById("dark-mode").addEventListener("click", () => toggleTheme(true));
document.getElementById("light-mode").addEventListener("click", () => toggleTheme(false));

// Загрузка сохраненных данных при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    const savedUsername = localStorage.getItem("username");
    const savedEmail = localStorage.getItem("email");

    if (savedUsername && savedEmail) {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("profile-container").style.display = "block";
        document.getElementById("profile-username").textContent = savedUsername;
        document.getElementById("profile-email").textContent = savedEmail;
    }
});

function setLightMode() {
    if (!document.body.classList.contains("light-mode")) {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
        localStorage.setItem("theme", "light"); // Сохраняем светлый режим
    }
}

function setDarkMode() {
    if (!document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark"); // Сохраняем тёмный режим
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem("theme"); // Получаем сохранённую тему
    if (savedTheme === "dark") {
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
    }
}

// Загрузка темы при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    loadTheme(); // Загружаем сохранённую тему

    const darkModeButton = document.getElementById("dark-mode-btn");
    const lightModeButton = document.getElementById("light-mode-btn");

    if (darkModeButton) {
        darkModeButton.addEventListener("click", setDarkMode);
    }

    if (lightModeButton) {
        lightModeButton.addEventListener("click", setLightMode);
    }
});





