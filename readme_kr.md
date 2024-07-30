<br/>

<div align="center">
  <a href="https://barreleyescan.com/dashboard">
    <img src="https://github.com/k930503/k930503/assets/48827393/15d2445b-b46f-4056-92c8-6ec18115f29e" alt="Logo"  height="200">
  </a>

  <br />  

  <h2>@Barreleye scan &middot;  <img src="https://img.shields.io/badge/npm package-@lts-success" alt="npm" height="18"/></h2> 

  <p align="center">
   <b>Barreleye Blockchain Scan</b> 은 블록체인의 <b>투명성과 가시성</b> 을 높이기 위해 개발된 오픈 소스 프로젝트입니다. <br/> 이 프로젝트는 블록체인 데이터를 분석하고 시각화하여 사용자에게 유용한 정보를 제공하는 것을 목표로 합니다. </b>

 
  with initial developer [@Youngmin Kim](https://github.com/k930503), [@Nayoung Kim](https://github.com/usiyoung)

  
</a></h6>
  </p>
</div>

<br>
 


<details>
  <summary>목차</summary>
  <ol>
    <li><a href="#서버_설정">서버 설정</a></li>
    <li><a href="#프론트엔드_설정">프론트엔드 설정</a></li>
  </ol>
</details>



## 프로젝트 시작 가이드

[View in English](https://github.com/barreleye-labs/barreleyescan/blob/develop/README.md)


### 서버 설정

1. **코드 클론**: [barreleye core](https://github.com/barreleye-labs/barreleye) 에 가서 코드를 클론합니다.
     
   ```bash
   git clone https://github.com/barreleye-labs/barreleye.git
   ```

2. **Go Version 설정 및 명령어 실행**
   1. Go SDK 1.22.0로 구성합니다.
   2. 클론한 코드에서 아래 명령어를 순차적으로 입력해 서버를 활성화시킵니다.


   <br/>

   
    ```bash
   make barreleye
    ```

    ```bash
   make nayoung
    ```


    ```bash
   make youngmin
    ```

### 프론트엔드 설정

**1. Barreleyescan 코드로 이동:** 프로젝트 디렉토리로 이동합니다.

**2. Node.js 및 npm 설정**
   1. Node.js 버전을 LTS로 설정합니다.
   2. 필요한 패키지를 설치합니다.

      ```bash
      npm i 
      ```

**3. 개발 서버 실행**

  ```
  npm run dev
  ```

이제 프로젝트가 성공적으로 작동합니다. 즐겁게 코딩하세요! 🚀
