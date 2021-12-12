import { Pipe, PipeTransform } from '@angular/core';
import { DiaryEntry } from 'src/app/models/diaryentry';
import { OverviewItemObject } from 'src/app/models/overviewItem';
import { Quest } from 'src/app/models/quest';

@Pipe({name: "groupBy"}) 
export class GroupByPipe implements PipeTransform{
    transform(itemArray: Array<any>, field: string): any{
        const callback = (accumulator: any, item: any) => {
            //grouped Field Value = The name of the field by which you're grouping.
            //item = The value being grouped
            //Accumulator = Object with groupedFieldValue as key and an array of items associated with that Field as value
            const groupedFieldValue =  this.getFieldValue(field, item);

            if (accumulator.hasOwnProperty(groupedFieldValue)){
                accumulator[groupedFieldValue].push(item);
            } else {
                accumulator[groupedFieldValue] = [item];
            }

            return accumulator;
        }
        const groupedObj: {any : OverviewItemObject[]} = itemArray.reduce(callback, {});
        const groupArray: {key: string, value: OverviewItemObject[]}[] = Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
        const sortedGroupArray: {key: string, value: OverviewItemObject[]}[] = groupArray.sort(
            (group1, group2) => group1.key.toLowerCase() < group2.key.toLowerCase() ? 1 : -1
        );

        return sortedGroupArray.reverse() //Necessary as Diaryentries are in inverse order
    }

    getFieldValue(field: string, item: object): any{
        /**Returns the field of a given item, even if it is nested within it */
        const keys: string[] = field.split(".");

        let currentValue: any = item;
        for (let key of keys){
            currentValue = currentValue[key];
        }

        return currentValue;
    }
}

@Pipe({name: "groupByFirstLetter"})
export class GroupByFirstLetterPipe implements PipeTransform{
    transform(itemArray: Array<any>, field: string): any{
        const callback = (accumulator, item) => {
            const groupedFieldValue: string = item[field];
            const firstLetter: string = groupedFieldValue[0];
            if(accumulator.hasOwnProperty(firstLetter)) accumulator[firstLetter].push(item);
            else accumulator[firstLetter] = [item];
            return accumulator;
        }
        const groupedObj = itemArray.reduce(callback, {});
        return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
    }
}
