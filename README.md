# GreenWaySeoul

## 프로젝트 개요
GreenWaySeoul은 서울 지역의 쓰레기통 위치 정보를 기반으로 플로깅 활동을 지원하는 환경 커뮤니티 앱입니다.
2023년 웹 서비스 BinFinder로 시작된 이 프로젝트는 사용자 접근성을 높이기 위해 모바일 앱으로 확장되었고, 리액트 네이티브 학습을 계기로 2025년 6월 정식 출시되었습니다.
쓰레기통 위치 확인, 플로깅 기록, 피드 기능 등을 통해 사용자 참여를 유도하며, AWS 기반 인프라에서 운영 중이며 추후 개인 서버 전환 및 기능 확장을 계획하고 있습니다.

## 주요기능
- 서울 지역 중심 쓰레기통 위치 표시
- 로그인하지 않아도 쓰레기통 위치만 확인 가능한 게스트 모드
- 플로깅 기록 작성 (날짜, 유지 시간, 제목, 설명, 점수 입력)
- 플로깅 기록 저장 및 목록 확인 (피드 형태)
- 소셜 로그인 지원 (애플, 카카오)
- 일반 로그인 지원(추천 코드 입력 시 회원가입 가능)

## 사용된 기술
| CATEGORY | SKILLS |
| --- | --- |
| **FrontEnd** | <img src="https://img.shields.io/badge/React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logoColor=white"> <img src="https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> |
| **UI/UX** | <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"> |
| **BackEnd** | <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white"> <img src="https://img.shields.io/badge/TypeORM-262627?style=for-the-badge&logoColor=white"> <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white"> |
| **Infra** | <img src="https://img.shields.io/badge/AWS%20EC2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"> <img src="https://img.shields.io/badge/AWS%20RDS-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white"> |
| **CI/CD** | 준비 중 (GitHub Actions / AWS CodePipeline 예정) |

## 다운받기

- App Store : https://apps.apple.com/kr/app/greenwayseoul/id6747158637
- Google Play: 2025년 9월 예정

---

## Project Overview
GreenWaySeoul is a community-based mobile application that encourages eco-friendly behavior through plogging, using trash bin location data in Seoul.
Originally launched as a web project called BinFinder in 2023, it evolved into a mobile app to improve accessibility. The idea was revisited during React Native learning in 2024, and the fully featured app was officially released in June 2025.
It provides users with real-time bin locations, plogging logs, and social features. Currently hosted on AWS, it’s planned for migration to a self-hosted environment with continued updates and feature expansions.

## Key Features
- Trash bin locations mapped throughout Seoul
- Guest mode for accessing bin locations without login
- Plogging record creation (date, duration, title, description, score)
- Feed-style view of saved plogging records
- Social login (Apple, Kakao)
- Email/password login with invite code registration

## Tech Stack

### Frontend
- React Native – Cross-platform mobile development
- TypeScript – Type-safe coding environment
- Zustand – Lightweight global state management
- React Query – Data fetching and server state synchronization

### UI/UX
- Figma – UI design and prototyping
- Backend & Infrastructure
- NestJS & TypeORM – Scalable and modular backend architecture
- PostgreSQL – Relational database
- AWS (EC2, RDS) – Hosting and database infrastructure

### CI/CD
- In progress (Planned: GitHub Actions or AWS CodePipeline)

### Git Commit Convention
- Feat: Add new features
- Fix: Bug fixes
- Docs: Documentation updates
- Comment: Add or update code comments
- Style: Code formatting (no logic changes)
- Refactor: Code restructuring
- Test: Add or update test code
- Chore: Maintenance tasks (e.g. dependency updates)
- Rename: Rename files or folders
- Remove: Delete files
- Merge: Branch merging

### Download
- App Store: GreenWaySeoul on App Store
- Google Play: Coming September 2025
