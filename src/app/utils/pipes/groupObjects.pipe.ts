import { Pipe, PipeTransform } from '@angular/core';
import { DiaryEntry } from 'src/app/models/diaryentry';
import { Quest } from 'src/app/models/quest';

@Pipe({name: "groupBy"}) 
export class GroupByPipe implements PipeTransform{
    transform(itemArray: Array<any>, field: string): any{
        const callback = (accumulator, item) => {
            const groupedFieldValue = item[field];
            if (accumulator.hasOwnProperty(groupedFieldValue)) accumulator[groupedFieldValue].push(item);
            else accumulator[groupedFieldValue] = [item];
            return accumulator;
        }
        const groupedObj = itemArray.reduce(callback, {});
        return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
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

@Pipe({name: "groupByQuestTaker"})
export class GroupByQuestTakerPipe implements PipeTransform{
    transform(itemArray: Array<Quest>): any{
        const callback = (accumulator: object, quest: Quest) => {
            const questTaker: string = quest.taker;
            if(accumulator.hasOwnProperty(questTaker)) accumulator[questTaker].push(quest);
            else accumulator[questTaker] = [quest];
            return accumulator;
        }
        
        const groupedQuests = itemArray.reduce(callback, {});
        const result = Object.keys(groupedQuests).map(key => ({key, value: groupedQuests[key] }));
        // Sort by Quest-Taker alphabetically, but put "Group" quests always at the start
        const sortedResults = result.sort((objA, objB) =>{
            if (objA.key === "Group") return -1;
            else if (objB.key === "Group") return 1;
            else if (objA.key > objB.key) return 1;
            else if (objA.key === objB.key) return 0;
            else return -1;
        });

        // Sort individual quests by quest-status, In-progress > On Hold > Completed > Failed
        const statusValues = {"In progress": 1, "On Hold": 2, "Completed": 3, "Failed": 4 }
        for (const [index, quest] of sortedResults.entries()){
            sortedResults[index].value = quest.value.sort((objA, objB) => {
                if (objA.status !== objB.status){
                    return statusValues[objA.status] - statusValues[objB.status];
                } else {
                    if (objA.name > objB.name) return 1;
                    else if (objA.name <objB.name) return -1;
                }
            })
        }
        console.log(sortedResults);
        return sortedResults;
    }
}