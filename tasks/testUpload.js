const gulp = require('gulp')
const GulpSSH = require('gulp-ssh') // ssh

// 读取配置文件[每个人的不同,不上传svn,没有则生成一份格式]
const fs = require('fs')
const authPath = './authInfoTest.txt'
let sshConfigStr = null
try {
  sshConfigStr = fs.readFileSync(authPath, 'utf-8')
} catch (e) {
  fs.writeFileSync(
    authPath,
    '{"host":"本地ip","port":对应端口,"username":"自己的账户","password":"账户密码"}'
  )
}

const sshConfig = JSON.parse(sshConfigStr)
const gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: sshConfig
})

// 上传js
gulp.task('testuploadjs', async () => {
  return gulp
    .src(['./dist/*.js'])
    .pipe(gulpSSH.dest('/home/web/apache/htdocs/js/apph5/huodong'))
})

// 上传css
gulp.task('testuploadcss', async () => {
  return gulp
    .src(['./dist/*.css'])
    .pipe(gulpSSH.dest('/home/web/apache/htdocs/css/apph5/huodong'))
})

// 上传jsp
gulp.task('testuploadHtml', async () => {
  return gulp
    .src(['./dist/html/*.html'])
    .pipe(gulpSSH.dest('/home/web/WebProjects/apph5/huodong'))
})

// 上传js、css、jsp
gulp.task(
  'testUpload',
  gulp.series('testuploadjs', 'testuploadcss', 'testuploadHtml', done =>
    done(console.log('完成'))
  )
)
