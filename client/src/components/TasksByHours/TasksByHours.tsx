// Libs
import React from 'react';

// Redux
import { connect } from 'react-redux';

// Hooks
import { useTasksByHours } from '../../hooks/useTasksByHours/useTasksByHours';

// Services
import { objectService } from '../../lib/ObjectService/ObjectService';
import { timeEntriesSelector } from '../../stores/selectors/timeEntries';

// Variables
import { dataColors } from '../../variables/colors';

// Components
import ChartContainer from './components/ChartContainer/ChartContainer';

// Types
import { TasksByHoursProps } from './TasksByHours.types';
import { tasksByHours } from '../../../interfaces/Task';

const TasksByHours = ({ timeEntries }: TasksByHoursProps) => {
    let data = {};
    const tasksByHours = useTasksByHours(timeEntries);

    const getHoursByTwoDecimals = (entries: tasksByHours) => {
        return entries.map((entry) =>
            Math.round(entry.hours * 100) / 100);
    };

    const getTasksFromEntries = (entries: tasksByHours) => entries.map(entry => entry.task);

    const convertRawDataForChart = (entries: tasksByHours) => {
        entries = objectService.sortObjectsArray(true, entries, 'hours');
        const tasks = getTasksFromEntries(entries);
        const hours = getHoursByTwoDecimals(entries);
        return {
            tasks,
            hours
        }
    }

    const getChartData = (data: number[], labels: string[]) => {
        return {
            datasets: [{
                label: 'Categories by Hours',
                backgroundColor: dataColors,
                borderWidth: '0',
                data
            }],
            labels
        };
    }

    if (tasksByHours.length) {
        const { hours, tasks } = convertRawDataForChart(tasksByHours);
        data = getChartData(hours, tasks);
    }

    return (
        <>
            { !objectService.isEmptyObject(data) && <ChartContainer data={data} />}
        </>
    );
};

const mapStateToProps = (state: any): any => {
    return {
        timeEntries: timeEntriesSelector(state)
    }
};

export default connect(mapStateToProps, null)(
    React.memo(TasksByHours)
);
