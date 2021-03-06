import { CourseState, courseInitialState } from './courses.state';
import { CoursesActionTypes, CoursesAction } from './courses.actions';
import { createSelector } from 'reselect';

export function courseReducer(state = courseInitialState, 
    action: CoursesAction): CourseState {

    switch(action.type) {

        case CoursesActionTypes.COURSES_LOAD_REQUESTED: {
            return Object.assign({}, state, {
                courses: null,
                isLoadingCourses: true,
                selectedCourse: null,
                error: null
            });
        }

        case CoursesActionTypes.COURSES_LOAD_COMPLETED: {
            return Object.assign({}, state, {
                courses: action.payload.courses,
                isLoadingCourses: false,
                selectedCourse: null,
                error: null
            });
        }

         case CoursesActionTypes.COURSE_SELECTED: {
            return Object.assign({}, state, {
                selectedCourse: action.payload.url
            });
        }

        case CoursesActionTypes.COURSES_ERROR: {
            return Object.assign({}, state, {
                courses: null,
                isLoadingCourses: false,
                selectedCourse: null,
                error: action.payload.error
            });
        }

        case CoursesActionTypes.COURSE_LESSONS_LOAD_COMPLETED: {
            return Object.assign({}, state, {
                courseLessons: action.payload.lessons
            });
        }

        default: {
            return state;
        }
    }
}

export const getCourses = (state: CourseState) => state.courses;

export const getIsLoading = (state: CourseState) => state.isLoadingCourses;

export const getSelectedUrl = (state: CourseState) => state.selectedCourse;

export const getSelectedCourse = createSelector(getCourses, getSelectedUrl, 
    (courses, selectedUrl) => courses.find(course => course.url == selectedUrl)
);

export const getCourseLessons = (state: CourseState) => state.courseLessons;

