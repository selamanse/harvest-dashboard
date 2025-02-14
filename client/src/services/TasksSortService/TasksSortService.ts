// Types
import { tasksByHours } from '@/types/Task';
import { timeEntriesType } from '@/types/TimeEntry';

class TasksSortService {
    getEntriesWithTask(entries: timeEntriesType): tasksByHours {
        return entries.map(entry => ({
            task: entry.task.name,
            hours: entry.hours
        }));
    }

    getUniqueTasksFromEntries(entries: tasksByHours) {
        const tasksOnlyList = entries.map(entry => entry.task);
        return [...new Set(tasksOnlyList)];
    };

    getTasksByHoursList (tasks: string[]): tasksByHours {
        return tasks.map((task) => ({
            task,
            hours: 0
        }));
    };

    addEntryHoursToTasks(entriesWithGroup: tasksByHours, tasksByHoursList: tasksByHours) {
        entriesWithGroup.forEach(entry => {
            tasksByHoursList.forEach((group) => {
                if (group.task == entry.task) {
                    group.hours += entry.hours;
                }
            });
        });
    }

    getTasksByHours(entries: timeEntriesType): tasksByHours {
        const entriesWithGroup = this.getEntriesWithTask(entries);
        const uniqueGroups = this.getUniqueTasksFromEntries(entriesWithGroup);

        let tasksByHoursList = this.getTasksByHoursList(uniqueGroups);
        this.addEntryHoursToTasks(entriesWithGroup, tasksByHoursList);

        return tasksByHoursList;
    };
}

const tasksSortService = new TasksSortService();

export default tasksSortService;
