import React, { useEffect, useState, useRef } from "react";
import { Logo } from "@/components/Logo";
import { MobileNav } from "@/components/MobileNav";
import { useNavigation } from "@/hooks/useNavigation";
import { LegalSpecialityLabels } from "@/types/speciality";
import { RegisterLawyerInfo } from "@/types/lawyer";
import { registerLawyer } from "@/api/auth/register";
import { MobileBackButton } from "@/components/MobileBackButton";
import { checkUsernameDuplication } from "@/api/users";

export const LawyerRegister = (): React.JSX.Element => {
  const { goToLogin } = useNavigation();
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [licenseImage, setLicenseImage] = useState<File | string>("");
  const [error, setError] = useState<string>("");
  const dateInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [education, setEducation] = useState<string>("");
  const [career, setCareer] = useState<string>("");
  const [officeName, setOfficeName] = useState<string>("");
  const [officeAddress, setOfficeAddress] = useState<string>("");
  const [officePhone, setOfficePhone] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [usernameDuplicateMessage, setUsernameDuplicateMessage] =
    useState<string>("");

  // 아이디 또는 비밀번호가 입력되면 에러 메시지 초기화
  useEffect(() => {
    if (userId || password) {
      setError("");
    }
  }, [userId, password]);

  useEffect(() => {
    setUsernameDuplicateMessage("");
  }, [userId]);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const educationList = education.split("\n");
    const careerList = career.split("\n");
    if (!licenseImage) {
      setError("증명서 이미지를 첨부해주세요.");
      return;
    }
    const userData: RegisterLawyerInfo = {
      legalSpecialties: checkedList,
      officeInfo: {
        officeName: officeName,
        officeAddress: officeAddress,
        officePhoneNumber: officePhone,
      },
      educations: educationList,
      name: name,
      birthDate: birthDate,
      careers: careerList,
      username: userId,
      phoneNumber: phoneNumber,
      password: password,
      description: description,
    };

    const multiPartFormData = new FormData();
    multiPartFormData.append(
      "data",
      new Blob([JSON.stringify(userData)], { type: "application/json" })
    );
    multiPartFormData.append("licenseImage", licenseImage);

    try {
      const response = await registerLawyer(multiPartFormData);
      alert("관리자가 승인시 로그인 할 수 있습니다.");
      goToLogin();
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError("잘못된 아이디/비밀번호입니다.");
      } else {
        setError("회원가입 중 오류가 발생했습니다");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLicenseImage(e.target.files[0]);
    } else {
      setLicenseImage("");
    }
  };

  const checkedItemHandler = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
      return;
    }

    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
      return;
    }

    return;
  };

  const checkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
  };

  const checkUsernameDuplicate = async () => {
    if (userId.trim() === "") {
      setUsernameDuplicateMessage("아이디를 입력하세요");
      return;
    }
    try {
      const response = await checkUsernameDuplication(userId);
      if (response.data.isDup) {
        setUsernameDuplicateMessage(`${userId}은 이미 사용중인 아이디입니다.`);
      } else {
        setUsernameDuplicateMessage(`${userId}은 사용 가능한 아이디입니다.`);
      }
    } catch (error: any) {
      if (error.response.data.code === 4000009) {
        const errorMessage = error.response.data.message.split(": ")[1];
        setUsernameDuplicateMessage(errorMessage);
      } else {
        setUsernameDuplicateMessage("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-white overflow-x-hidden">
      {/* 헤더 영역 */}
      <header className="fixed top-0 left-0 right-0 w-full h-[72px] flex items-center justify-center bg-white z-20 shadow-sm">
        <div className="relative w-full min-w-[355px] max-w-[1350px] pc:w-[70.31%] h-full flex items-center">
          {/* 모바일 뒤로가기 버튼 */}
          <MobileBackButton />
          {/* 데스크탑 로고 */}
          <Logo />
          <div className="flex items-center justify-between w-full">
            {/* 타이틀 */}
            <div className="absolute left-1/2 -translate-x-1/2 text-[19px] pc:text-[21px] font-bold">
              변호사 회원가입
            </div>

            {/* 균형을 위한 빈 공간 */}
            <div className="pc:hidden w-6"></div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="flex flex-col w-full flex-grow px-6 items-center pt-[36px]">
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-12 w-full pc:max-w-[570px] pc:mx-auto mt-10 pc:mt-16 px-5 py-[72px] border-b-[1.7px] border-[#B4B4B4]"
        >
          <div className="flex flex-col gap-y-10">
            <div className="bg-[#D9D9D9] rounded-md px-4 py-2 text-[15px] pc:text-[18px] font-bold">
              계정 정보
            </div>
            <div className="flex flex-col px-6 gap-y-14">
              {/* 아이디 입력 필드 */}
              <div className="flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[17px] pc:text-[19px] font-bold text-nowrap">
                  아이디 <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  className="transition-colors border-b-2 pl-[10px] pc:pl-4 text-[15px] pc:text-[19px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
                {usernameDuplicateMessage && (
                  <div
                    className={`text-sm pl-4 ${
                      usernameDuplicateMessage.includes("사용 가능한")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {usernameDuplicateMessage}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => checkUsernameDuplicate()}
                  className="transition-colors inline-block w-[120px] mx-auto mt-6 bg-[#CBD8B7] text-black text-[16px] py-2 rounded-md hover:bg-[#A9BE8C]"
                >
                  중복확인
                </button>
              </div>

              {/* 비밀번호 입력 필드 */}
              <div className="relative flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[17px] pc:text-[19px] font-bold text-nowrap">
                  비밀번호 <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  className="transition-colors border-b-2 pl-[10px] pc:pl-4 text-[15px] pc:text-[19px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* 이름 입력 필드 */}
              <div className="flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[17px] pc:text-[19px] font-bold text-nowrap">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="이름을 입력해주세요."
                  className="transition-colors border-b-2 pl-[10px] pc:pl-4 text-[15px] pc:text-[19px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* 휴대폰 번호 입력 필드 */}
              <div className="flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[17px] pc:text-[19px] font-bold text-nowrap">
                  휴대폰 번호 <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center px-3 text-[#E2E4E5] group-focus-within:text-[#A9BE8C] transition-colors">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 31 31"
                      fill="currentColor"
                      className="absolute w-6 h-6 pc:w-7 pc:h-7"
                    >
                      <path
                        fill="currentColor"
                        d="M21.951 24.66h-12.5V7.16h12.5m0-5h-12.5a2.491 2.491 0 0 0-2.5 2.5v22.5a2.5 2.5 0 0 0 2.5 2.5h12.5a2.5 2.5 0 0 0 2.5-2.5V4.66a2.5 2.5 0 0 0-2.5-2.5Z"
                      />
                    </svg>
                  </div>
                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    placeholder="휴대폰 번호를 입력해주세요."
                    className="transition-colors border-b-2 w-full pl-14 pc:pl-16 text-[15px] pc:text-[19px] placeholder:text-[15px] pc:placeholder:text-[17px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      setPhoneNumber(value);
                    }}
                  />
                </div>
              </div>
              {/* 생년월일 입력 필드 */}
              <div className="flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[17px] pc:text-[19px] font-bold text-nowrap">
                  생년월일 <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="date"
                  ref={dateInputRef}
                  className={`appearance-none bg-white transition-colors border-b-2 pl-[10px] pc:pl-4 py-[10px] pc:py-4 text-[15px] pc:text-[19px] border-[#E2E4E5] focus:outline-none focus:border-[#A9BE8C] placeholder-[#A9BE8C] hover:cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer ${
                    birthDate ? "text-black" : "text-[#E2E4E5]"
                  }`}
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  onClick={() => dateInputRef.current?.showPicker()}
                  placeholder="연도-월-일"
                />
              </div>
              {/* 증명서 첨부 필드 */}
              <div className="flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[17px] pc:text-[19px] font-bold text-nowrap">
                  합격 증명서 첨부 <span className="text-red-500">*</span>
                </label>
                <div className="w-full h-[200px] border-2 border-dashed border-[#E2E4E5] rounded-lg flex items-center justify-center overflow-hidden">
                  {licenseImage ? (
                    <img
                      src={
                        typeof licenseImage === "string"
                          ? licenseImage
                          : URL.createObjectURL(licenseImage)
                      }
                      alt="증명서 미리보기"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-[#B4B4B4] text-[14px] pc:text-[16px]">
                      이미지를 첨부하세요
                    </div>
                  )}
                </div>
                <input
                  required
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  className="bg-[#CBD8B7] hover:bg-[#A9BE8C] transition-colors mx-auto mt-2 w-[90px] text-black font-bold text-[14px] pc:text-[16px] py-2 rounded-md"
                  onClick={() => fileInputRef.current?.click()}
                >
                  파일 첨부
                </button>
              </div>
              {/* 분야선택 필드 */}
              <div className="flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[17px] pc:text-[19px] font-bold text-nowrap">
                  분야 <span className="text-red-500">*</span>
                </label>
                <span className="block text-center bg-[#F5F7F2] py-3 rounded-md text-[#A9BE8C] text-[14px] font-bold pc:text-[18px] mt-5">
                  해당하는 분야들을 모두 체크하세요.
                </span>
                <div className="grid grid-cols-2 pc:grid-cols-3 gap-x-8 gap-y-4">
                  {Object.entries(LegalSpecialityLabels).map(([key, label]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={key}
                        checked={checkedList.includes(key)}
                        onChange={(e) => checkHandler(e, key)}
                        className="transition-colors w-3 h-3 pc:w-4 pc:h-4 text-[#A9BE8C] border-[#E2E4E5] rounded focus:ring-[#A9BE8C] focus:ring-offset-0"
                      />
                      <label
                        htmlFor={key}
                        className={`transition-colors text-[14px] pc:text-[16px] cursor-pointer text-nowrap hover:text-[#A9BE8C] ${
                          checkedList.includes(key)
                            ? "text-[#A9BE8C]"
                            : "text-[#656565]"
                        }`}
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {/* 자기소개 입력 필드 */}
              <div className="flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[17px] pc:text-[19px] font-bold text-nowrap">
                  자기소개 <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  placeholder="자기소개를 입력해주세요."
                  rows={1}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="transition-colors bg-[#C9D8B7] rounded-md pl-[10px] pc:pl-4 text-[#5C6E56] text-[15px] pc:text-[19px] placeholder:text-[#5C6E56] placeholder:text-[15px] pc:placeholder:text-[17px] py-[10px] pc:py-4 focus:outline-none  focus:border-[#A9BE8C] border-2 border-transparent"
                />
              </div>
              <span className="block text-center bg-[#F5F7F2] p-4 rounded-md text-[#A9BE8C] text-[14px] font-bold pc:text-[18px]">
                경력 및 학력은
                <br />
                엔터를 기준으로 나눠집니다.
              </span>
              {/* 경력 입력 필드 */}
              <div className="flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[17px] pc:text-[19px] font-bold text-nowrap">
                  경력 <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  placeholder="경력을 입력해주세요."
                  rows={4}
                  value={career}
                  onChange={(e) => setCareer(e.target.value)}
                  className="transition-colors bg-[#C9D8B7] rounded-md pl-[10px] pc:pl-4 text-[#5C6E56] text-[15px] pc:text-[19px] placeholder:text-[#5C6E56] placeholder:text-[15px] pc:placeholder:text-[17px] py-[10px] pc:py-4 focus:outline-none  focus:border-[#A9BE8C] border-2 border-transparent"
                />
              </div>
              {/* 학력 입력 필드 */}
              <div className="flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[17px] pc:text-[19px] font-bold text-nowrap">
                  학력 <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  placeholder="학력을 입력해주세요."
                  rows={4}
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="transition-colors bg-[#C9D8B7] rounded-md pl-[10px] pc:pl-4 text-[#5C6E56] text-[15px] pc:text-[19px] placeholder:text-[#5C6E56] placeholder:text-[15px] pc:placeholder:text-[17px] py-[10px] pc:py-4 focus:outline-none  focus:border-[#A9BE8C] border-2 border-transparent"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-10">
            <div className="bg-[#D9D9D9] rounded-md px-4 py-2 text-[15px] pc:text-[18px] font-bold">
              사무실 정보
            </div>
            <div className="flex flex-col px-6 gap-y-14">
              {/* 사무실 이름 입력 필드 */}
              <div className="flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[17px] pc:text-[19px] font-bold text-nowrap">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="사무실 이름을 입력해주세요."
                  className="transition-colors border-b-2 pl-[10px] pc:pl-4 text-[15px] pc:text-[19px] placeholder:text-[15px] pc:placeholder:text-[17px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
                  value={officeName}
                  onChange={(e) => setOfficeName(e.target.value)}
                />
              </div>
              {/* 사무실 주소 입력 필드 */}
              <div className="flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[17px] pc:text-[19px] font-bold text-nowrap">
                  주소 <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center px-3 text-[#E2E4E5] group-focus-within:text-[#A9BE8C] transition-colors">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 31 31"
                      fill="currentColor"
                      className="absolute w-6 h-6 pc:w-7 pc:h-7"
                    >
                      <path
                        fill="currentColor"
                        d="M15.701 14.494a3.125 3.125 0 1 1 0-6.25 3.125 3.125 0 0 1 0 6.25Zm0-11.875a8.75 8.75 0 0 0-8.75 8.75c0 6.563 8.75 16.25 8.75 16.25s8.75-9.687 8.75-16.25a8.75 8.75 0 0 0-8.75-8.75Z"
                      />
                    </svg>
                  </div>
                  <input
                    required
                    type="text"
                    placeholder="사무실 주소를 입력해주세요."
                    className="transition-colors border-b-2 w-full pl-14 pc:pl-16 text-[15px] pc:text-[19px] placeholder:text-[15px] pc:placeholder:text-[17px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
                    value={officeAddress}
                    onChange={(e) => setOfficeAddress(e.target.value)}
                  />
                </div>
              </div>
              {/* 사무실 전화번호 입력 필드 */}
              <div className="flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[17px] pc:text-[19px] font-bold text-nowrap">
                  전화번호 <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center px-3 text-[#E2E4E5] group-focus-within:text-[#A9BE8C] transition-colors">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 31 31"
                      fill="currentColor"
                      className="absolute w-6 h-6 pc:w-7 pc:h-7"
                    >
                      <path
                        d="M21.3953 16.6544L20.8265 17.2207C20.8265 17.2207 19.4728 18.5657 15.779 14.8932C12.0853 11.2207 13.439 9.8757 13.439 9.8757L13.7965 9.5182C14.6803 8.6407 14.764 7.2307 13.9928 6.2007L12.4178 4.09695C11.4628 2.82195 9.61904 2.6532 8.52529 3.7407L6.56279 5.6907C6.02154 6.2307 5.65904 6.9282 5.70279 7.7032C5.81529 9.68695 6.71279 13.9532 11.7178 18.9307C17.0265 24.2082 22.0078 24.4182 24.044 24.2282C24.689 24.1682 25.249 23.8407 25.7003 23.3907L27.4753 21.6257C28.6753 20.4344 28.3378 18.3907 26.8028 17.5569L24.4153 16.2582C23.4078 15.7119 22.1828 15.8719 21.3953 16.6544Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    placeholder="사무실 연락처를 입력해주세요."
                    className="transition-colors border-b-2 w-full pl-14 pc:pl-16 text-[15px] pc:text-[19px] placeholder:text-[15px] pc:placeholder:text-[17px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
                    value={officePhone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      setOfficePhone(value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-5 justify-center items-center">
            {/* 에러 메시지 표시 */}
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {/* 회원가입 버튼 */}
            <button
              type="submit"
              className="transition-colors w-full bg-[#CBD8B7] text-black font-bold text-[16px] pc:text-[18px] mb-10 pc:mb-0 py-3 rounded-md hover:bg-[#A9BE8C]"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
      {/* 모바일 하단 네비게이션 */}
      <MobileNav />
    </div>
  );
};
