import { Constants } from "src/app/app.constants";
  
export function onlyOnTouchDevices(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor{
  const originalMethod = descriptor.value;

  const modifiedMethod = function(){
    if (!Constants.isTouchDevice) return;

    return originalMethod.apply(this, arguments);
  }

  descriptor.value = modifiedMethod;

  return descriptor;
}
