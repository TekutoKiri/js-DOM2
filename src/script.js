const imageContainer = document.getElementById('imageContainer');

function fetchImages() {
    fetch('https://picsum.photos/v2/list?page=1&limit=4')
        .then(response => response.json())
        .then(data => {
            data.forEach(image => {
                const img = document.createElement('img');
                img.src = image.download_url;
                imageContainer.appendChild(img);
            });
        })
        .catch(error => console.error('Error fetching images:', error));
}

document.getElementById('loadMore').addEventListener('click', fetchImages);
document.getElementById('clearGallery').addEventListener('click', () => {
    imageContainer.innerHTML = '';
});
document.getElementById('removeLast').addEventListener('click', () => {
    const images = imageContainer.getElementsByTagName('img');
    if (images.length > 0) {
        imageContainer.removeChild(images[images.length - 1]);
    }
});
document.getElementById('reverseGallery').addEventListener('click', () => {
    const images = Array.from(imageContainer.getElementsByTagName('img'));
    imageContainer.innerHTML = '';
    images.reverse().forEach(img => imageContainer.appendChild(img));
});

// Завантажуємо 4 картинки при першому завантаженні
fetchImages();
// Завантажити початкові картинки
fetchImages(currentPage);

// Завантажити ще картинки
document.getElementById('loadMore').addEventListener('click', async () => {
    currentPage++;
    await fetchImages(currentPage);
});

// Очистити галерею
document.getElementById('clearGallery').addEventListener('click', () => {
    gallery.innerHTML = '';
    currentPage = 1; // Скидаємо номер сторінки
});

// Видалити останню картинку
document.getElementById('removeLast').addEventListener('click', () => {
    const images = gallery.getElementsByTagName('img');
    if (images.length > 0) {
        gallery.removeChild(images[images.length - 1]);
        updateImageSizes(); // Оновлюємо розміри
    }
});

// Перевернути галерею
document.getElementById('reverseGallery').addEventListener('click', () => {
    const images = Array.from(gallery.getElementsByTagName('img'));
    gallery.innerHTML = '';
    images.reverse().forEach(img => gallery.appendChild(img));
    updateImageSizes(); // Оновлюємо розміри
});

// Перемішати галерею
document.getElementById('shuffleGallery').addEventListener('click', () => {
    const images = Array.from(gallery.getElementsByTagName('img'));
    gallery.innerHTML = '';
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }
    images.forEach(img => gallery.appendChild(img));
    updateImageSizes(); // Оновлюємо розміри
});

// Оновлюємо розміри зображень при зміні розміру вікна
window.addEventListener('resize', () => {
    updateImageSizes();
});
