import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function transformObservableArrayContent(observable: Observable<object[]>, ObjectClass: any): Observable<any>{
    /**
     * Takes an Observable of an array of object and creates new objects of type ObjectClass with it.
     * Created for use with services, so that incoming JSON data is automatically transformed into an instance of a ModelObject.
     * This way the Model-Data can already be associated with specific functions.
     */
    return observable.pipe(map(contentArray => {
        const newContent: typeof ObjectClass[] = [];
        for(let item of contentArray){
            newContent.push(new ObjectClass(item));
        }
        return newContent;
      }));
}

export function transformObservableContent(observable: Observable<any>, ObjectClass: any): Observable<any>{
    /**
     * Takes an Observable of an object and creates a new object of type ObjectClass with it.
     * Created for use with services, so that incoming JSON data is automatically transformed into an instance of a ModelObject.
     * This way the Model-Data can already be associated with specific functions.
     */
    return observable.pipe(map(content => {
        return new ObjectClass(content);
    }))
}

export function TransformObservable(modelClass: any){
    /**Decorator to apply transformObservableContent */
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){

        const originalMethod = descriptor.value;
        descriptor.value = function(){
            const observable = originalMethod.apply(this, arguments);
            return transformObservableContent(observable, modelClass);
        }
        return descriptor;
    }
}

export function TransformArrayObservable(modelClass: any){
    /**Decorator to apply transformObservableArrayContent */
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){

        const originalMethod = descriptor.value;
        descriptor.value = function(){
            const observable = originalMethod.apply(this, arguments);
            return transformObservableArrayContent(observable, modelClass);
        }
        return descriptor;
    }
}