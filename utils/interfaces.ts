
export interface Task {
    _id: string;
    title: string;
    description: string;
    date: Date;
    status: string;
    owner: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Activity {
    _id: string;
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    date: Date;
    repeat?: number;
    repeat_end_date?: string;
    owner: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Event {
    _id: string;
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    tags: string[];
    owner: string;
    createdAt: Date;
    updatedAt: Date;
}
  
export interface Deadline {
    _id: string;
    title: string;
    description: string;
    date: Date;
    owner: string;
    createdAt: Date;
    updatedAt: Date;
}
  
export interface Deadline{
    _id: string;
    title: string;
    description: string;
    date: Date;
    tags: string[];
    owner: string;
    createdAt: Date;
    updatedAt: Date;

}

export interface Event{
    _id: string;
    title: string;
    description: string;
    date: Date;
    owner: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateTaskDTO {
    title: string;
    description: string;
    date: Date;
    status: string;
}

export interface CreateActivityDto {
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    repeat: number | null;
    repeat_end_date: Date | null;
}


export interface CreateDeadlineDTO{
    title: string;
    description: string;
    date: Date;
}

export interface CreateEventDTO{
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
}
