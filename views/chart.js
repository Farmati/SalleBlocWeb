var chart =bb.generate({
    bindto: "#chart",
    data: {
        columns: [
            ["JavaScript", 30, 200, 100, 170, 150, 250],
            ["PHP", 130, 100, 140, 35, 110, 50]
        ],
        types: {
          JavaScript: "area-spline",
          PHP: "step"
        },
        colors: {
          JavaScript: "blue",
          PHP: "green"
        }
    }
});