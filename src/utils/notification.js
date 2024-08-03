export const show = (text) => {
    let html = `
        ${text}
    `;
    let element = document.createElement("div");
    element.innerHTML = html;
    element.classList.add("notification");
    element.classList.add("notification-enter");

    document.getElementById("notification-container").appendChild(element);
    setTimeout(() => {
        element.classList.remove("notification-enter")
        element.classList.add("notification-exit");
    }, 3000);

    setTimeout(() => {
        element.remove();
    }, 3240);
}

export const ConfirmModal = () => {
    return new Promise((resolve) => {
        let container = document.getElementById("app-container");
        let html = document.createElement("div");
        html.setAttribute("id", "confirmModal");
        html.innerHTML = `
        <div class="overlay" overlay>
        </div>
        <div class="custom-modal-html" shadow fade radius-border>
            <div class="title confirmTitle">
                <h1>Alerta</h1>
            </div>
            <div class="content">
                <p>¿Esta seguro que desea continuar con esta accion? Es posible que no tenga retroceso</p>
                <br>
                <div class="actions" flex-center>
                    <a class="custom-button-html red" id="confirmModalButton">Continuar</a>
                    <a class="custom-button-html" id="cancelModalButton">Cancelar</a>
                </div>
            </div>
        </div>
        `;
        container.appendChild(html);

        document.getElementById("confirmModalButton").addEventListener("click", (e) => {
            html.remove();
            resolve(true);
        })

        document.getElementById("cancelModalButton").addEventListener("click", (e) => {
            html.remove();
            resolve(false);
        })
    })
}