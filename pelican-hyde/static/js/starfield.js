/* lucaso.io sidebar starfield — replaces the old particle mesh.
   Drifting, twinkling stars with the occasional shooting star.
   Respects prefers-reduced-motion (static stars, no animation). */
(function () {
    var canvas = document.getElementById('demo-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var W, H, stars = [], shoot = null;

    function resize() {
        var isFull = canvas.classList.contains('desktop-canvas');
        var r = canvas.parentElement.getBoundingClientRect();
        W = canvas.width = isFull ? window.innerWidth : r.width;
        H = canvas.height = isFull ? window.innerHeight : r.height;
        stars = Array.from({length: Math.floor(W * H / 4200)}, function () {
            return {
                x: Math.random() * W, y: Math.random() * H,
                r: Math.random() * 1.2 + .3,
                v: .04 + Math.random() * .16,
                p: Math.random() * Math.PI * 2,
                s: .4 + Math.random() * 1.4
            };
        });
    }

    function tick(t) {
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < stars.length; i++) {
            var s = stars[i];
            if (!reduce) {
                s.y += s.v;
                if (s.y > H + 2) { s.y = -2; s.x = Math.random() * W; }
            }
            ctx.globalAlpha = .3 + .6 * Math.abs(Math.sin(s.p + t * .001 * s.s));
            ctx.fillStyle = '#cfd9ff';
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, 7);
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        if (shoot) {
            shoot.x += shoot.vx; shoot.y += shoot.vy; shoot.life -= .02;
            var g = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x - shoot.vx * 10, shoot.y - shoot.vy * 10);
            g.addColorStop(0, 'rgba(205,217,255,' + Math.max(shoot.life, 0) + ')');
            g.addColorStop(1, 'rgba(205,217,255,0)');
            ctx.strokeStyle = g;
            ctx.lineWidth = 1.3;
            ctx.beginPath();
            ctx.moveTo(shoot.x, shoot.y);
            ctx.lineTo(shoot.x - shoot.vx * 10, shoot.y - shoot.vy * 10);
            ctx.stroke();
            if (shoot.life <= 0) shoot = null;
        } else if (!reduce && Math.random() < .0022) {
            shoot = {
                x: Math.random() * W, y: Math.random() * H * .4,
                vx: 2.6 + Math.random() * 2, vy: 1.4 + Math.random() * 1.2, life: 1
            };
        }
        requestAnimationFrame(tick);
    }

    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(tick);
})();
