Promise.all([
            fetch('includes/navbar.html').then(r=>r.text()),
            fetch('includes/background.html').then(r=>r.text()),
        ]).then(([nav, background]) => {
            document.getElementById('navbar').innerHTML = nav;
            document.getElementById('background').innerHTML = background;
        });
