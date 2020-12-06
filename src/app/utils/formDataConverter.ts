export function convertSingleFileModelToFormData(model: any, fileAttributeName: string = "file"): FormData{
    if (!model.hasOwnProperty(fileAttributeName)) throw `Can't convert object to FormData! Your model does not have a ${fileAttributeName} property!`;
    if (!model[fileAttributeName][0]) throw `Can't convert object to FormData! Your model's ${fileAttributeName} has no file!`;

    const formData = new FormData();
    for ( var key in model ){
        if (key === fileAttributeName){
            formData.append(key, model[fileAttributeName][0]);
        } else if (model[key]){
            formData.append(key, model[key]);
        }
    }
    return formData;
}