class AdviceCard {
  constructor() {
    this.titleElement = document.querySelector("article h1");
    this.contentElement = document.querySelector("article p");
    this.updateButton = document.querySelector("article button");
    this.divider = document.getElementById("divider");
    this.setListener();
    this.updateImageSource();
  }

  setInitialAdvice() {
    this.titleElement.textContent = `Advice #${117}`;
    const initialAdvice = `“It is easy to sit up and take notice, what's difficult is getting up and taking action.”`;
    this.contentElement.textContent = `${initialAdvice}`;
  }

  async fetchRandomAdvice() {
    const { signal } = new AbortController();
    try {
      const response = await fetch("https://api.adviceslip.com/advice", signal);
      const { slip } = await response.json();
      const { id, advice } = slip;
      this.updateAdvice(id, advice);
    } catch {
      console.log("Failed to fetch");
      this.setInitialAdvice();
    }
  }
  updateAdvice(id, advice) {
    this.titleElement.textContent = `Advice #${id}`;
    this.contentElement.textContent = `"${advice}"`;
  }

  setListener() {
    this.updateButton.addEventListener("click", () => this.fetchRandomAdvice());
    window.addEventListener("resize", () => this.updateImageSource());
  }

  updateImageSource() {
    const newSrc =
      window.innerWidth > 1024
        ? "./images/pattern-divider-desktop.svg"
        : "./images/pattern-divider-mobile.svg";
    this.divider.src = newSrc;
  }
}

const advice = new AdviceCard();

advice.setInitialAdvice();
