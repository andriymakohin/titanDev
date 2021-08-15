import { createAction } from '@reduxjs/toolkit';

const showNotifyTrue = createAction('notify/showTrue');
const showNotifyFalse = createAction('notify/showFalse');

export default {
    showNotifyTrue,
    showNotifyFalse
}