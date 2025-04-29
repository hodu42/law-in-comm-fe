import React, { useState } from 'react';
import { createAnswer } from '@/api/answers';

export const AnswerWriteTest = () => {
  const [questionId, setQuestionId] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionId || !content) {
      alert('질문 ID와 답변 내용을 모두 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      await createAnswer(questionId, content);
      alert('답변이 성공적으로 작성되었습니다.');
      setContent('');
    } catch (error) {
      console.error('답변 작성 중 오류가 발생했습니다:', error);
      alert('답변 작성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F7FA]">
      <div className="max-w-2xl mx-auto p-6 mt-[72px]">
        <h1 className="text-2xl font-bold mb-6 text-[#555555]">답변 작성 테스트</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-[10px] border-2 border-[#CFCFCF]">
          <div>
            <label htmlFor="questionId" className="block text-sm font-medium text-[#555555]">
              질문 ID
            </label>
            <input
              type="text"
              id="questionId"
              value={questionId}
              onChange={(e) => setQuestionId(e.target.value)}
              className="mt-1 block w-full rounded-[10px] border-2 border-[#CFCFCF] p-2 focus:border-[#9CB395] focus:outline-none"
              placeholder="질문 ID를 입력하세요"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-[#555555]">
              답변 내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-[10px] border-2 border-[#CFCFCF] p-2 focus:border-[#9CB395] focus:outline-none"
              placeholder="답변 내용을 입력하세요"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#9CB395] text-white py-2 px-4 rounded-[10px] hover:bg-[#5C6E56] focus:outline-none focus:ring-2 focus:ring-[#9CB395] focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? '제출 중...' : '답변 작성'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnswerWriteTest;
