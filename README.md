# GreenWaySeoul

## 프로젝트 개요

"GreenWaySeoul"은 외국 관광객을 대상으로 하는 어플리케이션으로, 사용자의 위치를 기반으로 서울시 내
쓰레기통 위치를 확인하고 해당 위치에서 로드뷰 및 길찾기 서비스를 제공합니다.
이 어플리케이션은 총 4개의 언어로 서비스되며, 사용자들이 편리하게 서울시 내 쓰레기통을 찾아 이용할 수 있도록 도와줍니다.

## 주요기능

- 사용자 위치 기반 쓰레기통 탐색
- 쓰레기통 길찾기

## 사용된 기술

- 프론트엔드
JavaScript & TypeScript: React Native 애플리케이션 개발에 사용.
React Native: 모바일 애플리케이션 개발을 위한 프레임워크.
Figma: UI/UX 디자인 및 프로토타입 제작에 사용.

- 백엔드 및 서버리스
AWS
DynamoDB: 서버리스 NoSQL 데이터베이스로, 애플리케이션의 데이터를 저장.
API Gateway: RESTful API를 통해 애플리케이션과 서버 사이의 통신을 관리.
Lambda: 서버리스 함수로, 특정 이벤트에 따라 비즈니스 로직을 실행.

- 애플리케이션 빌드 및 배포:
Expo
Expo Go: 개발 중 애플리케이션을 테스트하기 위해 사용.
EAS (Expo Application Services): 앱의 빌드 및 배포를 자동화.
EAS Build & Submit: iOS 및 Android용으로 애플리케이션을 빌드하고, TestFlight와 같은 
플랫폼에 배포.

CI/CD:
GitHub Actions: 코드 변경 사항을 자동으로 테스트하고, 빌드 및 배포하는 워크플로를 설정하여 지속적인 통합/배포(CI/CD)를 구현.


## 프로젝트 구조

- client: 프론트엔드 소스 코드가 들어 있음.
- public: 이미지와 CSS 파일과 같은 정적 파일이 들어 있음.

## 시작하기

1. 저장소를 복제합니다.
2. cd GreenWaySeoul 명령을 사용하여 프로젝트 폴더로 이동합니다.
3. 필요한 종속성을 설치합니다: npm install.
4. npx expo start --go 명령을 사용하여 프로젝트를 실행한다.
5. QR코드를 실행하여 앱을 실행한다.

## Git 커밋

- Feat: 새로운 기능 추가
- Fix: 버그 수정
- Docs: 문서 업데이트 (README.md 등)
- Comment: 주석 추가 또는 수정
- Style: 코드 포맷팅, 세미콜론 누락, 코드 변경 없음
- Refactor: 코드 리팩토링
- Test: 테스트 코드 추가 또는 수정
- Chore: 빌드 작업 업데이트, 패키지 매니저 수정, 모듈 변경 (실제 코드 변경 없음)
- Rename: 파일 또는 폴더 이름 변경, 경로 이동
- Remove: 파일 삭제
- Merge: 브랜치 병합

## 기여하기

1. 저장소를 포크합니다.
2. 새 브랜치를 만듭니다 (git checkout -b new-feature).
3. 변경 사항을 만들고 커밋합니다 (git commit -am '새로운 기능 추가').
4. 변경 사항을 포크한 저장소에 푸시합니다 (git push origin new-feature).
5. 풀 리퀘스트를 엽니다.

## 팀원 : 최승원

## 다운받기

링크 : ~~~

---

## Project Overview

"GreenWaySeoul" is an application designed for foreign tourists, allowing them to locate trash bins within Seoul based on their current location. The application also offers street view and navigation services from the identified location. This application is available in a total of four languages, facilitating convenient access and utilization of trash bins throughout the city of Seoul.

## Key Features

- Trash bin exploration based on user's location
- Trash bin navigation and street view
- Multilingual support

## Technologies Used

- JavaScript, TypeScript, React Native, Figma
- Firebase
- AWS: EC2

## Project Structure

- client: Contains the frontend source code.
- public: Contains static files such as images and CSS files.

## Getting Started

1. Clone the repository.
2. Navigate to the project folder with the command: cd GreenWaySeoul.
3. Install the necessary dependencies: npm install.
   ...writing

## Git Commit Guidelines

- Feat: Adding new features
- Fix: Fixing bugs
- Docs: Updating documentation (README.md, etc.)
- Comment: Adding or modifying comments
- Style: Code formatting, missing semicolons, no code changes
- Refactor: Code refactoring
- Test: Adding or modifying test codes
- Chore: Updating build tasks, modifying package manager, module changes (no actual code changes)
- Rename: Renaming files or folders, moving paths
- Remove: Deleting files
- Merge: Merging branches

## Contributing

1. Fork the repository.
2. Create a new branch (git checkout -b new-feature).
3. Make changes and commit them (git commit -am 'Adding new feature').
4. Push the changes to your forked repository (git push origin new-feature).
5. Open a pull request.

## Team Member: Choi Seungwon

## Download

Link: ~~~
