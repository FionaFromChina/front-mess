const colors = require('colors');
const inquirer = require('inquirer');
const shelljs = require('shelljs');

// 选项
const question = [
    {
        type: 'list',
        name: 'env',
        message: '发布环境',
        choices: [
            {
                name: '(dev)测试环境',
                value: 'dev'
            },
            {
                name: '(pre)预发布环境',
                value: 'pre'
            }
        ]
    },
    {
        type: 'list',
        name: 'cat',
        message: '应用',
        choices: [
            {
                name: '直播',
                value: 'live'
            },
            {
                name: '会控',
                value: 'meeting'
            },
            {
                name: '预约会议',
                value: 'schedule'
            },
            {
                name: '通讯录',
                value: 'nop'
            }
        ]
    }
];
const cfmQuestion = [{
    type: 'confirm',
    name: 'confirm',
    default: false,
    message: '确定要在dev分支部署pre环境?'
}];
let choice = {}; // 存放升级的环境和目录


// 欢迎
console.log('\n' + '开始部署'.magenta );
// 交互
inquirer.prompt(question)
    .then (answer => {
        choice = answer;
        if(answer.env === 'pre') {
            // valid 简单校验，不允许在dev分支上部署pre
            const { output } = shelljs.exec(`git branch | awk '/\\*/ { print $2; }'`, {silent: true});
            if (output === 'develop\n') {
                confirmDeploy();
                return;
            }
        }
        deploy();
    })
    .catch(err => {
        console.log(err);
    }) ;

// exception 在dev分支上部署pre环境
function confirmDeploy() {
    inquirer.prompt(cfmQuestion)
        .then(cfm => {
            if(cfm.confirm === 'y') {
                deploy();
                return;
            }
            // 否则将退出
            shelljs.exit();
        })
}

// deploy();
function deploy() {
    // shell js no not support promise
    // console.log(`cd deploy/${choice.env} && sh ${choice.cat}.sh`);
    shelljs.exec(`cd deploy/${choice.env} && sh ${choice.cat}.sh`, () => {
        console.log('\n' + '部署成功'.yellow );
    })
}







