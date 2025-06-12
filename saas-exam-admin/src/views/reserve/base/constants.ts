import type { FormRule } from 'tdesign-vue-next';

export const FORM_RULES: Record<string, FormRule[]> = {
    name: [{ required: true, message: '请输入预约名称', type: 'error' }],
    type: [{ required: true, message: '请输入预约类型', type: 'error' }],
    location: [{ required: true, message: '请输入位置', type: 'error' }],
    banner: [{ required: true, message: '请上传至少一张图片', type: 'error' }],
    description: [{ required: true, message: '请填写描述', type: 'error' }],
    tags: [{ required: true, message: '请填写标签', type: 'error' }],
    start_time: [{ required: true, message: '请选择时间范围', type: 'error' }],
    split_time: [
        { required: true, message: '请输入时间间隔', type: 'error' },
        {
            validator: ({ value }) => Number(value) > 0,
            message: '时间间隔必须大于0',
            type: 'error'
        }
    ],
    project: [
        {
            validator: (val, context) => {
                const formData = val
                if (!Array.isArray(val) || val.length === 0) {
                    return false;
                }
                // 检查每项是否 name 和 description 都有值
                return val.every(item => {
                    return item.name?.trim() && item.description?.trim();
                });
            },
            message: '请完善所有子项目的名称和描述',
            type: 'error',
        }
    ]

};