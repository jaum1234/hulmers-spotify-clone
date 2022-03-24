import moment from "moment"

export const getDurationInMinutes = (duration?: number) => {
    return moment.duration(duration).minutes()
}

export const getDurationInSeconds = (duration?: number) => {
    return moment.duration(duration).seconds()
}