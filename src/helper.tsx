import * as React from 'react';
import { addClass } from '@syncfusion/ej2-base';

// Kanban Function
export const getResourceName = (data: any) => {
  if (data && data.resources) {
    return (
      <div className="e-card-header-title e-tooltip-text">
        {data.resources}
      </div>
    );
  }
  return null;
};
export const getBoolean = (data: any) => {
  let progressWidth: string = data.Progress + "%";
  if (data.Status !== 'Open' && data.Status !== 'Done') {
    return (
      <div className="e-progress-bar" style={{ paddingLeft: "12px" }}>
        <div className="e-progress-bar-container">
          <div className="e-progress-bar-background" style={{ width: "100%" }}>
            <div className="e-progress-bar-progress" style={{ width: progressWidth, background: "rgba(173, 216, 230)", height: "5px" }}></div>
            <div className="e-progress-bar-text">{progressWidth}</div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
export const getTags = (data: string): JSX.Element[] => {
  let tagElements: JSX.Element[] = [];

  if (data) {
    let tags: string[] = data.split(',');
    for (let tag of tags) {
      let backgroundColor = '';
      switch (tag.trim()) {
        case 'Bug':
          backgroundColor = '#ffcccc';
          break;
        case 'Customer Task':
          backgroundColor = '#c1e2f4';
          break;
        case 'Internal Request':
          backgroundColor = '#f0f0f0';
          break;
        case 'Release Bug':
          backgroundColor = '#ffe0b2';
          break;
        case 'Breaking Issue':
          backgroundColor = '#ff9999';
          break;
        default:
          backgroundColor = '#ffffff';
          break;
      }
      tagElements.push(
        <div key={tag} className="e-card-tag-field e-tooltip-text" style={{ backgroundColor: backgroundColor }}>
          {tag}
        </div>
      );
    }
  }

  return tagElements;
};
export const getKanbanResorurceImage = (data: any): JSX.Element | null => {
  if (data.resources) {
    const resourceName: any = data.resources;
    return (
      <img
        className="e-card-avatar"
        style={{
          width: '30px',
          height: '30px',
          textAlign: 'center',
          background: 'gainsboro',
          color: '#6b6b6b',
          borderRadius: '50%',
          position: 'absolute',
          right: '12px',
          bottom: '10px',
          fontSize: '12px',
          fontWeight: '400',
        }}
        src={`//ej2.syncfusion.com/demos/src/gantt/images/${resourceName}.png`}
        alt={resourceName}
      />
    );
  }
  return null;
};
export const cardRendered = (args: any) => {
  const priority = args.data?.Priority;
  if (priority) {
    let val: string = args.data.Priority as string;
    addClass([args.element], val);
  }
}

// Gantt Function
export const queryTaskbarInfo = (args: any) => {
  if (args.data.taskData.Status == 'InProgress') {
    args.progressBarBgColor = 'rgba(201, 167, 244, 1)';
    args.taskbarBgColor = 'rgba(201, 167, 244, 0.4)';
    args.taskbarBorderColor = 'rgba(201, 167, 244, 1)';
  } else if (args.data.taskData.Status == 'Open') {
    args.progressBarBgColor = 'rgba(194, 220, 240, 1)';
    args.taskbarBgColor = 'rgba(194, 220, 240, 0.4)';
    args.taskbarBorderColor = 'rgba(194, 220, 240, 1)';
  } else if (args.data.taskData.Status == 'Done') {
    args.progressBarBgColor = 'rgba(182, 214, 171, 1)';
    args.taskbarBgColor = 'rgba(182, 214, 171, 0.4)';
    args.taskbarBorderColor = 'rgba(182, 214, 171, 1)';
  } else if (args.data.taskData.Status == 'Testing') {
    args.progressBarBgColor = 'rgba(244, 218, 168, 1)';
    args.taskbarBgColor = 'rgba(244, 218, 168, 0.4)';
    args.taskbarBorderColor = 'rgba(244, 218, 168, 1)';
  }
};

// Scheduler Function 

const applyCategoryColor = (args: any, currentView: any) => {
  if (!args.element) {
    return;
  }
  if (args.data.Status === 'Done') {
    args.element.style.backgroundColor = 'rgba(182, 214, 171, 1)';
  } else if (args.data.Status === 'Open') {
    args.element.style.backgroundColor = 'rgba(194, 220, 240, 1)';
  } else if (args.data.Status === 'InProgress') {
    args.element.style.backgroundColor = 'rgba(201, 167, 244, 1)';
    args.element.style.border = 'rgba(160, 133, 195, 1)';
  } else if (args.data.Status === 'Testing') {
    args.element.style.backgroundColor = 'rgba(244, 218, 168, 1)';
  }
};
export const scheduleeventRendered = (args: any, scheduleObj: any) => {
  applyCategoryColor(args, scheduleObj.current.currentView);
}


//Grid 
export const gridGroupTemplate = (props: any) => {
  return props.items[0].resources
}
export function startdateValueAccessor(field: any, data: any): any {
  if (data && data.StartTime) {
    const originalDateString = data.StartTime
    const originalDate = new Date(originalDateString);
    const day = originalDate.getUTCDate();
    const month = originalDate.getUTCMonth() + 1;
    const year = originalDate.getUTCFullYear();
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDateString = `${formattedDay}.${formattedMonth}.${year}`;
    return formattedDateString
  }
  return '';
}
export function enddateValueAccessor(field: any, data: any): any {
  if (data && data.EndTime) {
    const originalDateString = data.EndTime
    const originalDate = new Date(originalDateString);
    const day = originalDate.getUTCDate();
    const month = originalDate.getUTCMonth() + 1;
    const year = originalDate.getUTCFullYear();
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDateString = `${formattedDay}.${formattedMonth}.${year}`;
    return formattedDateString
  }
  return '';
}
export function resourceValueAccessor(field: any, data: any): any {
  if (data && data.resources && data.resources.length > 0) {
    const resourceName = data.resources;
    return resourceName;
  }
  return '';
}