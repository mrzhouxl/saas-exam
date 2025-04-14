<template>
	<div class="p-3">
		<t-tabs v-model="value">
			<t-tab-panel :value="1" label="单题录入" :destroy-on-hide="false">
				<t-form :rules="FORM_RULES" class="mt-8" :data="formData">
					<t-form-item label="试卷类型" name="type">
						<t-radio-group v-model="formData.type">
							<t-radio value="single">单选题</t-radio>
							<t-radio value="multiple">多选题</t-radio>
							<t-radio value="judge">判断题</t-radio>
							<t-radio value="enter">填空题</t-radio>
							<t-radio value="sort">排序题</t-radio>
							<t-radio value="indefinite">不定项</t-radio>
							<t-radio value="shortanswer">简答题</t-radio>
							<t-radio value="calculate">计算题</t-radio>
							<!-- <t-radio value="connect">连线</t-radio> -->
						</t-radio-group>
					</t-form-item>
					<t-form-item name="title" label="试题题目">
						<ComEditer v-model="formData.title"></ComEditer>
					</t-form-item>
					<t-form-item label="试题选项" name="options">
						<div class="w-100">
							<template v-for="(item, index) in formData.options">
								<div class="mt-8 py-2">
									<span class="">{{ item.label }}</span>
									<div class="d-flex">
										<ComEditer v-model="formData.options[index].value"></ComEditer>
										<span @click="delOptions(index)" style="cursor: pointer;margin-left: 5px;">
											<icon-font color="#0C66FA" name="icon-shanchu"></icon-font>
										</span>
									</div>
								</div>
							</template>
							<t-button class="mt-8" @click="addExamOptions">添加选项</t-button>
						</div>
					</t-form-item>
					<t-form-item label="答案" name="answer">
						<t-radio-group v-if="formData.type === 'single' || formData.type === 'judge'" v-model="formData.answer">
							<t-radio :key="index" v-for="(item, index) in formData.options" :value="item.label">{{ item.label
							}}</t-radio>
						</t-radio-group>
						<div v-if="formData.type === 'multiple' || formData.type === 'indefinite'">
							<t-checkbox-group :model-value="formData.answer.split('')" @change="handleAnswer">
								<t-checkbox :key="index" v-for="(item, index) in formData.options" :value="item.label">{{ item.label
								}}</t-checkbox>
							</t-checkbox-group>
						</div>
						<!-- enter -->
						<div v-if="formData.type === 'enter'">
							<t-input style="width:320px;" v-model="formData.answer"></t-input>
							<p class="gay">1.一个空格填写一个答案，如果答案有多种表达方式，例如：二和2，中间用#隔开，二#2
								<br />
								2.如多个空的答案包含重复项，需要勾选【答案有顺序要求】
							</p>
						</div>
						<!-- sort -->
						<div v-if="formData.type === 'sort'">
							<t-input style="width:320px;" v-model="formData.answer" placeholder="请输入正确的排序顺序"></t-input>
						</div>
						<!-- shortanswer -->
						<div class="w-100" v-if="formData.type === 'shortanswer' || formData.type === 'calculate'">
							<ComEditer v-model="formData.answer"></ComEditer>
						</div>
					</t-form-item>
					<t-form-item label="解析" name="analysis">
						<ComEditer v-model="formData.analysis"></ComEditer>
					</t-form-item>
					<t-form-item label="难易程度" name="difficulty">
						<t-select style="width:320px;" v-model="formData.difficulty" :options="difficulty"></t-select>
					</t-form-item>
					<t-form-item>
						<t-space size="small">
							<t-button theme="primary" type="submit" @click="submit">{{ route.params.type === 'edit' ? '编辑' : '提交'
							}}</t-button>
							<t-button theme="default" variant="base" type="reset">重置</t-button>
							<!-- 下方示例代码，有效，勿删 -->
							<!--<t-button theme="default" @click="submitForm">实例方法提交</t-button>-->
							<!--<t-button theme="default" variant="base" @click="resetForm">实例方法重置</t-button>-->
							<!--<t-button theme="default" variant="base" @click="validateOnly">仅校验</t-button>-->
						</t-space>
					</t-form-item>
				</t-form>
			</t-tab-panel>
			<t-tab-panel :value="2" label="批量导入" :destroy-on-hide="false">
				<template #panel>
					<p style="padding: 25px">选项卡2的内容，使用 t-tab-panel 渲染</p>
				</template>
			</t-tab-panel>
		</t-tabs>

	</div>
</template>
  
<script setup lang='ts'>
import services from '@/utils/axios';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ComEditer from '../../components/ComEditer.vue';
import { CheckboxGroupChangeContext, MessagePlugin } from 'tdesign-vue-next';
const route = useRoute();
const router = useRouter()
const FORM_RULES = {
	type: [{ required: true, message: '类型必选' }],
	title: [{ required: true, message: '题目必填' }],
	options: [{ required: true, message: '请填写选项' }],
	answer: [{ required: true, message: '请填写答案' }],
	analysis: [{ required: true, message: '请填写解析' }],
	difficulty: [{ required: true, message: '请填写难易程度' }]
};
const a = ref()
const value = ref(1)
const difficulty = [
	{ label: '简单', value: '1' },
	{ label: '普通', value: '2' },
	{ label: '困难', value: '3' },
]
const formData = ref<any>({
	type: 'single',
	group: route.params.id,
	answer: '',
	options: [
		{
			label: 'A',
			value: ''
		},
		{
			label: 'B',
			value: ''
		},
		{
			label: 'C',
			value: ''
		},
		{
			label: 'D',
			value: ''
		}
	]
})
onMounted(() => {
	if (route.params.type === 'edit') {
		fetch(route.params.id)
	} else {
	}
})

const handleAnswer = (e: Array<string>, content: CheckboxGroupChangeContext) => {
	formData.value.answer = e.join('')
}
const fetch = async (id: string | string[]) => {
	let examitem = await services.get(`exam-item/${id}`);
	formData.value = examitem
}
const submit = async () => {
	if (route.params.type === 'edit') {
		const res: any = await services.put(`exam-item/${route.params.id}`, formData.value);
		res && MessagePlugin.success('编辑成功')
		router.go(-1)
	} else {
		const res = await services.post('exam-item', formData.value);
		res && MessagePlugin.success('编辑成功')
		router.go(-1)
	}
}
const addExamOptions = () => {
	const nextOption = String.fromCharCode(formData.value.options.slice(-1)[0].label.charCodeAt(0) + 1)
	formData.value.options.push({
		label: nextOption,
		value: ''
	})
}
const delOptions = (index: number) => {
	formData.value.options.splice(index, 1)
	updateOptions()
}
const updateOptions = () => {
	for (const key in formData.value.options) {
		let code = 65;
		formData.value.options[key].label = String.fromCharCode(code + Number(key));
	}
}
</script>
  
<style>
.gay {
	color: #999;
	font-size: 12px;
	line-height: 1.6;
	margin-bottom: 12px;
}
</style>