const emitInfoToasts = function(text, type) {

    Toastify({
        text: text,
        gravity: "left",
        position: "right",
        duration: 3000,
        stopOnFocus: true,
        className: type.toString(),

        }).showToast();
}

export default emitInfoToasts;