import { addWeeks } from '../util/TimeHelpers';

const now = new Date();
export const mockData = [
    {date:addWeeks(-16, now), value:17},
    {date:addWeeks(-15, now), value:17},
    {date:addWeeks(-14, now), value:18},
    {date:addWeeks(-13, now), value:20},
    {date:addWeeks(-12, now), value:23},
    {date:addWeeks(-11, now), value:22},
    {date:addWeeks(-10, now), value:19},
    {date:addWeeks(-9, now), value:18},
    {date:addWeeks(-8, now), value:18},
    {date:addWeeks(-7, now), value:20},
    {date:addWeeks(-6, now), value:21},
    {date:addWeeks(-5, now), value:20},
    {date:addWeeks(-4, now), value:23},
    {date:addWeeks(-3, now), value:24},
    {date:addWeeks(-2, now), value:23},
    {date:addWeeks(-1, now), value:24},
    {date:now, value:25}
]