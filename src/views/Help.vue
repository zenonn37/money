<template>
  <div class="render-child">
    <div class="page-header">
      <div class="page-title">Faq's</div>
    </div>

    <div class="faq-parent">
      <div class="faq">
        <ul>
          <li v-for="q in faqs" :key="q.id">
            <h6>Question# {{q.id}}</h6>
            <h2>{{q.title}}</h2>
            <h6>Category: {{q.issue}}</h6>
            <h4>Question:</h4>
            <p>{{q.question}}</p>
            <h4>Answer:</h4>
            <p>{{q.answer}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { faq } from "@/model/faqs";
export default {
  data() {
    return {
      faqs: faq
    };
  }
};
</script>

