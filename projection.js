window.onload = function() {
    let canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = 1000,
        height = canvas.height = 600,
        fl = 6500,
        points = [],
        needsUpdate = true,
        centerZ = 1500;

    context.translate(width / 2, height / 2);

    points[0] = { x: 0, y: 0, z: 0 };
    points[1] = { x: 0, y: 100, z: 0 };
    points[2] = { x: 100, y: 100, z: 0 };
    points[3] = { x: 100, y: 0, z: 0 };

    points[4] = { x: 0, y: 0, z: 100 };
    points[5] = { x: 0, y: 100, z: 100 };
    points[6] = { x: 100, y: 100, z: 100 };
    points[7] = { x: 100, y: 0, z: 100 };

    points[8] = { x: 50, y: 50, z: 50 };

    function resetPoints() {
        points[0] = { x: 0, y: 0, z: 0 };
        points[1] = { x: 0, y: 100, z: 0 };
        points[2] = { x: 100, y: 100, z: 0 };
        points[3] = { x: 100, y: 0, z: 0 };

        points[4] = { x: 0, y: 0, z: 100 };
        points[5] = { x: 0, y: 100, z: 100 };
        points[6] = { x: 100, y: 100, z: 100 };
        points[7] = { x: 100, y: 0, z: 100 };

        points[8] = { x: 50, y: 50, z: 50 };
    }

    function project() {
        for (let i = 0; i < points.length; i++) {
            let p = points[i],
                scale = fl / (fl + p.z + centerZ);

            p.sx = p.x * scale;
            p.sy = p.y * scale;
        }
    }

    function drawLine() {
        let p = points[arguments[0]];
        context.moveTo(p.sx, p.sy);

        for (let i = 1; i < arguments.length; i++) {
            p = points[arguments[i]];
            context.lineTo(p.sx, p.sy);
        }
    }

    function front_view() {
        resetPoints();

        for (let i = 0; i < points.length; i++) {
            points[i].z = 0;
        }

        needsUpdate = true;
    }

    function projection_cabine() {
        resetPoints();

        let a = Math.cos(0.79) / 2;
        let b = Math.sin(0.79) / 2;

        for (let i = 0; i < points.length; i++) {
            points[i].x = points[i].x + points[i].z * a;
            points[i].y = points[i].y + points[i].z * b;
            points[i].z = 0;
        }

        needsUpdate = true;
    }

    function single_point_central_projection() {
        resetPoints();
        let r = -0.005;

        for (let i = 0; i < points.length; i++) {
            points[i].x = points[i].x / (r * points[i].z + 1);
            points[i].y = points[i].y / (r * points[i].z + 1);
            points[i].z = points[i].z / (r * points[i].z + 1);
        }

        needsUpdate = true;
    }

    this.document.querySelector('#central-projection').addEventListener('mousedown', single_point_central_projection);
    this.document.querySelector('#front-projection').addEventListener('mousedown', front_view);
    this.document.querySelector('#side-projection').addEventListener('mousedown', projection_cabine);

    update();

    function update() {
        if (needsUpdate) {
            context.clearRect(-width / 2, -height / 2, width, height);
            project();

            context.beginPath();
            drawLine(0, 1, 2, 3, 0);
            drawLine(4, 5, 6, 7, 4);
            drawLine(4, 8);
            drawLine(5, 8);
            drawLine(6, 8);
            drawLine(7, 8);
            drawLine(0, 4);
            drawLine(1, 5);
            drawLine(2, 6);
            drawLine(3, 7);
            context.stroke();
            needsUpdate = false;
        }
        requestAnimationFrame(update);
    }

};