import * as dialogsModule from "ui/dialogs";

export function alert(message: string) {
    return dialogsModule.alert({
        title: "Reading Log",
        okButtonText: "OK",
        message: message
    });
}
