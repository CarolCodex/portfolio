<template>
  <div class="phone-wrap">
    <div class="phone-frame">
      <div class="phone-speaker" />
      <div class="phone-screen">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.phone-wrap {
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 0;
}

.phone-frame {
  width: clamp(340px, 28vw, 400px);
  max-width: 100%;
  padding: 12px;
  border-radius: 48px;
  background: linear-gradient(145deg, #151d2d, #344156);
  box-shadow:
    0 34px 86px rgba(15, 42, 95, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.phone-speaker {
  width: 82px;
  height: 6px;
  margin: 2px auto 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.28);
}

.phone-screen {
  position: relative;
  width: 100%;
  height: 720px;
  overflow: hidden;
  border-radius: 38px;
  background: #f9fafb;
  color: #101828;
}

@media (max-width: 940px) {
  .phone-wrap {
    order: 1;
  }

  .phone-frame {
    width: min(100%, 380px);
  }

  .phone-screen {
    height: 700px;
  }
}

@media (max-width: 520px) {
  .phone-frame {
    width: min(100%, 360px);
    padding: 9px;
    border-radius: 38px;
  }

  .phone-screen {
    height: 700px;
    border-radius: 30px;
  }
}
</style>
