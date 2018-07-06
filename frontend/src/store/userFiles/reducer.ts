import { Reducer } from 'redux';
import * as t from './types';

const initialState: t.UserFilesState = {
    folderInfo: {
        open: false,
        filesLoading: false,
    },
    filesInfo: {
        files: [],
        selectedFileIndex: -1,
        newFile: false,
        newFileError: false,
        fileSaved: []
    }
};

const userFiles: Reducer<t.UserFilesState> = (
    state: t.UserFilesState = initialState,
    action: t.UserFilesActions): t.UserFilesState => {
    switch (action.type) {
        case t.LOAD_FILES_REQUEST:
            return {
                ...state,
                folderInfo: {
                    ...state.folderInfo,
                    filesLoading: true,
                }
            };
        case t.LOAD_FILES_SUCCESS:
            return {
                filesInfo: {
                    ...state.filesInfo,
                    files: action.userFiles,
                    fileSaved: new Array(action.userFiles.length).fill(true)
                },
                folderInfo: {
                    filesLoading: false,
                    open: true,
                }
            };
        case t.LOAD_FILES_FAILURE:
            return {
                ...state,
                folderInfo: {
                    ...state.folderInfo,
                    filesLoading: false,
                }
            };
        case t.TOGGLE_FILES_FOLDER:
            return {
                ...state,
                folderInfo: {
                    ...state.folderInfo,
                    open: !state.folderInfo.open
                }
            };
        case t.CREATE_NEW_FILE_FIELD:
            return {
                ...state,
                filesInfo: {
                    ...state.filesInfo,
                    newFile: true,
                }
            };
        case t.DELETE_NEW_FILE_FIELD:
            return {
                ...state,
                filesInfo: {
                    ...state.filesInfo,
                    newFile: false,
                }
            };
        case t.CREATE_NEW_FILE:
            return {
                ...state,
                filesInfo: {
                    ...state.filesInfo,
                    files: [
                        ...state.filesInfo.files,
                        {
                            name: action.fileName,
                            content: ''
                        },
                    ],
                    newFileError: false,
                    fileSaved: [
                        ...state.filesInfo.fileSaved,
                        true,
                    ]
                }
            };
        case t.SELECT_FILE:
            return {
                ...state,
                filesInfo: {
                    ...state.filesInfo,
                    selectedFileIndex: action.fileIndex
                }
            };
        case t.DELETE_FILE:
            return {
                ...state,
                filesInfo: {
                    ...state.filesInfo,
                    files: state.filesInfo.files.filter(
                        (elem, index) => index !== action.fileIndex
                    ),
                }
            };
        case t.TRIGGER_NEW_FILE_ERROR:
            return {
                ...state,
                filesInfo: {
                    ...state.filesInfo,
                    newFileError: true
                }
            };
        default:
            return state;
    }
};

export default userFiles;