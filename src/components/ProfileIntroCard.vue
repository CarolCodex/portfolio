<template>
  <section class="profile-overview">
    <div class="profile-header">
      <div>
        <span class="profile-kicker">Hello! 我是曹兰</span>
        <h2>{{ profile.aboutTitle }}</h2>
      </div>
      <img class="profile-avatar" :src="avatarUrl" alt="曹兰头像" loading="lazy" decoding="async" />
    </div>

    <div class="profile-info-grid">
      <article v-for="fact in profile.profileInfo" :key="fact.label" class="profile-info-card">
        <span class="label">{{ fact.label }}</span>
        <strong class="value">{{ fact.value }}</strong>
      </article>
    </div>

    <div class="profile-summary">
      <p v-for="paragraph in aboutSummaryList" :key="paragraph">
        {{ paragraph }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import avatarUrl from '@/assets/avatar-cao-lan.jpg'
import { profile } from '@/data/profile'

const aboutSummaryList = computed(() =>
  Array.isArray(profile.aboutSummary) ? profile.aboutSummary : [profile.aboutSummary],
)
</script>

<style scoped>
.profile-overview {
  position: relative;
  padding: 44px 44px 42px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 34px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.82), rgba(230, 244, 255, 0.62)),
    radial-gradient(circle at 90% 14%, rgba(99, 179, 255, 0.26), transparent 28%),
    radial-gradient(circle at 16% 92%, rgba(118, 195, 255, 0.16), transparent 34%);
  box-shadow: 0 30px 80px rgba(43, 112, 198, 0.12);
  backdrop-filter: blur(20px);
  overflow: hidden;
}

.profile-overview::after {
  content: '';
  position: absolute;
  right: -80px;
  bottom: -100px;
  width: 260px;
  height: 260px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(102, 185, 255, 0.22), transparent 70%);
}

.profile-header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 32px;
}

.profile-kicker {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 6px 12px;
  border: 1px solid rgba(255, 255, 255, 0.84);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.58);
  color: #1268d6;
  font-size: 14px;
  font-weight: 900;
  box-shadow: 0 12px 28px rgba(43, 112, 198, 0.08);
}

h2 {
  max-width: 820px;
  margin: 18px 0 0;
  color: var(--color-ink);
  font-size: clamp(30px, 4vw, 46px);
  line-height: 1.18;
}

.profile-avatar {
  flex: 0 0 auto;
  width: 112px;
  height: 112px;
  border: 4px solid rgba(255, 255, 255, 0.88);
  border-radius: 999px;
  object-fit: cover;
  object-position: center 18%;
  box-shadow: 0 22px 56px rgba(42, 131, 255, 0.24);
}

.profile-info-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin: 38px 0 30px;
}

.profile-info-card {
  min-height: 118px;
  padding: 22px 24px;
  border: 1px solid rgba(255, 255, 255, 0.82);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.68);
  box-shadow:
    0 18px 42px rgba(43, 112, 198, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(16px);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.profile-info-card:hover {
  border-color: rgba(80, 162, 255, 0.38);
  box-shadow:
    0 24px 56px rgba(43, 112, 198, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.78);
  transform: translateY(-4px);
}

.profile-info-card .label {
  display: block;
  color: #6c7f99;
  font-size: 14px;
  font-weight: 700;
}

.profile-info-card .value {
  display: block;
  margin-top: 12px;
  color: #0f2a5f;
  font-size: 22px;
  font-weight: 800;
  line-height: 1.45;
}

.profile-summary {
  position: relative;
  z-index: 1;
  max-width: 100%;
}

.profile-summary p {
  margin: 0;
  color: #4d6581;
  font-size: 17px;
  line-height: 1.9;
  text-indent: 2em;
}

.profile-summary p + p {
  margin-top: 8px;
}

@media (max-width: 980px) {
  .profile-info-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .profile-avatar {
    width: 88px;
    height: 88px;
  }
}

@media (max-width: 640px) {
  .profile-overview {
    padding: 24px;
    border-radius: 24px;
  }

  .profile-header {
    flex-direction: column-reverse;
    gap: 20px;
  }

  h2 {
    font-size: clamp(27px, 9vw, 34px);
  }

  .profile-info-grid {
    grid-template-columns: 1fr;
    margin-top: 28px;
  }

  .profile-info-card {
    min-height: auto;
  }

  .profile-avatar {
    width: 82px;
    height: 82px;
  }

  .profile-summary p {
    font-size: 16px;
  }
}
</style>
