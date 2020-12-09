import { format } from 'date-fns'

export const dateFormatter = (date) => {
    return format(new Date(date), "MMMM dd, yyy")
}