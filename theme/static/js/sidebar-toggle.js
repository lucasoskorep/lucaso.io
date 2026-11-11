/* Mobile sidebar toggle — vanilla, replaces the jQuery version. */
document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.sidebar-toggle');
    if (toggle) {
        toggle.addEventListener('click', function () {
            document.getElementById('sidebar').classList.toggle('active');
        });
    }
});
