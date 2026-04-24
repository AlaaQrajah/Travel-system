# My API

هيكل باك إند نظامي باستخدام `Node.js` و`Express` وجاهز للتطوير.

## Run

```bash
npm install
npm run dev
```

## Structure

- `src/config`
- `src/core`
- `src/models`
- `src/modules`
- `src/routes`

## Project Style

- `config`: إعدادات البيئة والثوابت
- `core`: middlewares و utilities المشتركة
- `modules`: كل ميزة في مجلد مستقل
- `models`: نماذج قاعدة البيانات لاحقًا
- `routes`: نقطة تجميع لجميع مسارات الـ API

## Modules

- `auth`
- `booking`
- `health`
- `onboarding`
- `role`
- `trip`
