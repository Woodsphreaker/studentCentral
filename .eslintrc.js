module.exports = {
    extends: "standard",
    globals : {
        getData: true,
        cusosPendentesSubGestor: true,
        $: true,
        comboPopulate: true,
        appDataTables: true,
        getPlayerInfo: true,
        trilhasConfigAPI: true,
        trackCoursesAddAPI: true,
        trackCoursesListAPI: true,
        tracksTargetUsersAPI: true,
        trackCoursesDependencyListAPI: true,
        trackDependencyAddAPI: true,
        trackPreviewAPI: true,
        trackDependencyListAPI: true,
        trackPermitions: true,
        appModal: true,
        appUploadFive: true,
        appMensagem: true,
        appEditor: true,
        alert: true,
        consfirm: true,
        postData: true,
        messagesAPI: true,
        CURSO_REGRAS: true,
        location: true,
        history: true

    },
    rules: {
        "no-unused-expressions": 'off',
        "no-debugger": "off"
    }
};