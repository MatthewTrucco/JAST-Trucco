const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(outcome);
        deferredPrompt = null;
    }
});

window.addEventListener('appinstalled', (event) => {
    console.log('PWA was installed');
    deferredPrompt = null;
    butInstall.style.display = 'none';
});
