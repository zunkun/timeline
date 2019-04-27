const tags = {
	'人物': ['兄弟', '岳父母', '父母', '堂兄弟姐妹', '主内家人'],
	'家居': ['卧室', '客厅', '走廊', '阳台', '厨房'],
	'美食': ['面', '米饭'],
	'服饰': [],
	'动物': ['狗', '猫'],
	'行为': ['学琴', '育婴', '哺乳'],
	'城市': ['河南', '上海', '吉林', '长春', '信阳', '驻马店', '上蔡', '龙潭村'],
	'生活方式': ['听歌', '做饭', '睡觉', '旅游', '聚餐'],
	'生活用品': [],
	'文化艺术': ['乐器'],
	'自然风光': ['高山', '流水', '南湾湖'],
	'城市风光': [],
	'旅游地理': [],
	'商务职场': [],
	'交通运输': ['汽车', '自行车']
};

const todoTypes = [{ type: 'important', name: '重要事项' }, { type: 'common', name: '普通事项' }];

const projectTypes = [
	{ type: 'project', name: '项目' },
	{ type: 'work', name: '工作' },
	{ type: 'family', name: '家庭' },
	{ type: 'life', name: '生活' },
	{ type: 'skills', name: '技能' }
];

const progress = [
	{ sequence: 0, type: 'todo', name: '计划做' },
	{ sequence: 1, type: 'inprogress', name: '正在做' },
	{ sequence: 2, type: 'done', name: '已完成' },
	{ sequence: 3, type: 'archive', name: '归档' }
];
module.exports = {
	tags,
	imageBase: 'http://localhost:6789',
	todoTypes,
	projectTypes,
	progress
};
