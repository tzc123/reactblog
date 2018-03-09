import '../styles/about.css';

export default class About extends React.Component {
  
  render() {
    return (
      <main className="about">
        <h2>关于博主</h2>
        <p>
          97年生人，男，普通大学的普通大学生，今年毕业，目前没有工作。
        </p>      
        <h2>所以说...</h2>     
        <h2>求职</h2>      
        <ul>
          <li>
            有react-mobx、vue-vuex的项目经验。
          </li>
          <li>
            能熟练使用webpack进行项目自动化构建。
            <br></br>
          </li>
          <li>
            熟悉node，能够独立完成同构应用。
          </li>
          <li>
            熟悉javascript，能够使用原生javascript编程。
          </li>
          <li>
            能够使用语义化HTML进行页面构建。
          </li>
          <li>
            能够独立解决浏览器的兼容性问题。
          </li>
          <li>
            能够编写适配不同手机屏幕的页面。  
          </li>
          <li>
            对web安全有所了解，了解xss、csrf、sql注入。
          </li> 
          <li>
            逻辑性强，能够使用canvas编写一些小游戏。  
          </li>         
        </ul>
        <h2>关于博客</h2>
        <p>
          后端渲染启动在<a href="http://122.152.205.25">2333端口</a>
        </p>
      </main>
    )
  }
}