'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/styles/C_ActivityPage.module.scss';
import pagestyles from '@/styles/C_Paginationwrap.module.scss';
import C_TableList from '@/styles/C_TableList.module.scss';
import C_PageTemplate from '@/common/templates/C_PageTemplate';
import C_Input from '@/common/atom/C_Input';
import C_Button from '@/common/atom/C_Button';
import C_Pagination from '@/common/mocules/C_Pagination';

export default function ActivityPage({ title = '커뮤니티' }) {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [selected, setSelected] = useState('제목');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 퍼블리싱용 더미 데이터
    const dummy = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      title: '타이틀',
      description: '짧막한 내용이 들어갈 예정입니다...',
      date: '2024.12.13',
      img: `/images/sample${(i % 6) + 1}.png`,
    }));
    setData(dummy);
  }, []);

  const handleSearch = () => {
    console.log('검색 실행:', selected, keyword);
  };

  const handleSelect = label => {
    setSelected(label);
    setIsOpen(false);
  };

  const handleTabClick = label => {
    console.log('탭 클릭됨:', label);
  };

  const filteredData = data.filter(item =>
    selected === '제목' ? item.title.includes(keyword) : item.description.includes(keyword)
  );

  return (
    <C_PageTemplate
      title={title}
      tabBarCallback={handleTabClick}
      bannerImageUrl="/images/community.png"
    >
      <div className={C_TableList.wrapper}>
        {title && <h2 className={C_TableList.title}>{title}</h2>}

        {/* 🔍 검색바 */}
        <div className={C_TableList.searchbar}>
          <div className={C_TableList.selectWrapper}>
            <div className={C_TableList.selected} onClick={() => setIsOpen(!isOpen)}>
              {selected} ▼
            </div>
            {isOpen && (
              <ul className={C_TableList.optionList}>
                {['제목', '작성자'].map(label => (
                  <li key={label} onClick={() => handleSelect(label)}>
                    {label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <C_Input
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="검색어를 입력해주세요"
            placeholderSize="sm"
            placeholderColor="A"
            state="default"
            type="text"
            width="718px"
          />
          <C_Button title="검색" size="medium" type="B" onClick={handleSearch} />
        </div>

        {/* 📦 카드 리스트 */}
        <div className={styles.gridWrapper}>
          <div className={styles.grid}>
            {filteredData.map(item => (
              <div className={styles.card} key={item.id}>
                <div className={styles.imgBox}>
                  <Image src={item.img} alt={item.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.content}>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 📄 페이지네이션 + 글쓰기 버튼 */}
      <div className={pagestyles.paginationWrapper}>
        <div className={pagestyles.paginationCenter}>
          <C_Pagination totalPages={10} displayPageCount={10} />
        </div>
        <div className={pagestyles.buttonWrapper}>
          <C_Button title="글쓰기" size="medium" type="C" />
        </div>
      </div>
    </C_PageTemplate>
  );
}
