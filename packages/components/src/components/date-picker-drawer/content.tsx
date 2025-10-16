import 'swiper/css';
import 'swiper/css/virtual';
import { Mousewheel, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { computed, defineComponent, ref, watch } from 'vue';
import './index.scss';

export interface DatePickerResult {
  date: Date;
}

export interface DatePickerOptions {
  /**
   * 初始日期
   */
  initialDate?: Date;
  /**
   * 确认回调
   */
  onConfirm?: (result: DatePickerResult) => void;
  /**
   * 取消回调
   */
  onCancel?: () => void;
}

const DatePickerComponent = defineComponent({
  name: 'DatePickerComponent',
  props: {
    initialDate: {
      type: Date,
      default: () => new Date()
    },
    onConfirm: {
      type: Function,
      default: () => {}
    },
    onCancel: {
      type: Function,
      default: () => {}
    }
  },
  emits: ['confirm', 'close'],
  setup(props, { emit }) {
    // 日期相关数据
    const currentDate = ref(new Date(props.initialDate));
    const tempDate = ref(new Date(props.initialDate));

    // 年份、月份、日期的选中索引
    const selectedYearIndex = ref(tempDate.value.getFullYear() - (new Date().getFullYear() - 5));
    const selectedMonthIndex = ref(tempDate.value.getMonth());
    const selectedDateIndex = ref(tempDate.value.getDate() - 1);

    // Swiper实例引用
    const yearSwiperRef = ref<any>(null);
    const monthSwiperRef = ref<any>(null);
    const dateSwiperRef = ref<any>(null);

    // 初始化Swiper
    const onYearSwiper = (swiper: any) => {
      yearSwiperRef.value = swiper;
      // 初始化位置
      swiper.slideTo(selectedYearIndex.value, 0);
    };

    const onMonthSwiper = (swiper: any) => {
      monthSwiperRef.value = swiper;
      swiper.slideTo(selectedMonthIndex.value, 0);
    };

    const onDateSwiper = (swiper: any) => {
      dateSwiperRef.value = swiper;
      swiper.slideTo(selectedDateIndex.value, 0);
    };

    // 处理年份变化
    const handleYearChange = (swiper: any) => {
      const index = swiper.activeIndex;
      selectedYearIndex.value = index;
      const year = new Date().getFullYear() - 5 + index;
      tempDate.value.setFullYear(year);
      // 更新日期选项
      updateDateOptions();
    };

    // 处理月份变化
    const handleMonthChange = (swiper: any) => {
      const index = swiper.activeIndex;
      selectedMonthIndex.value = index;
      tempDate.value.setMonth(index);
      // 更新日期选项
      updateDateOptions();
    };

    // 处理日期变化
    const handleDateChange = (swiper: any) => {
      const index = swiper.activeIndex;
      selectedDateIndex.value = index;
      tempDate.value.setDate(index + 1);
    };

    // 更新日期选项（当月份或年份变化时）
    const updateDateOptions = () => {
      const oldDaysInMonth = dateOptions.value.length;
      const newDateOptions = generateDates();
      const newDaysInMonth = newDateOptions.length;

      // 只有当日期选项真正发生变化时才更新
      if (JSON.stringify(dateOptions.value) !== JSON.stringify(newDateOptions)) {
        dateOptions.value = newDateOptions;

        // 如果天数发生变化，需要检查选中项
        if (oldDaysInMonth !== newDaysInMonth) {
          // 如果当前选中的日期超出了新月份的天数，则调整为最后一天
          if (selectedDateIndex.value >= newDaysInMonth) {
            selectedDateIndex.value = newDaysInMonth - 1;
            tempDate.value.setDate(newDaysInMonth);
            // 更新Swiper位置
            setTimeout(() => {
              dateSwiperRef.value?.slideTo(selectedDateIndex.value, 0);
            }, 0);
          }
        }
      }
    };

    // 确认选择
    const handleConfirm = () => {
      currentDate.value = new Date(tempDate.value);
      emit('confirm', { date: currentDate.value });
      handleCancel();
    };

    // 取消选择
    const handleCancel = () => {
      emit('close');
    };

    // 生成年份选项
    const generateYears = () => {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let i = currentYear - 5; i <= currentYear + 5; i++) {
        years.push(i);
      }
      return years;
    };

    // 生成月份选项
    const generateMonths = () => {
      return Array.from({ length: 12 }, (_, i) => i + 1);
    };

    // 生成日期选项
    const generateDates = () => {
      const year = tempDate.value.getFullYear();
      const month = tempDate.value.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    };

    // 使用计算属性来避免在渲染函数外调用插槽
    const yearOptions = computed(() => generateYears());
    const monthOptions = computed(() => generateMonths());
    const dateOptions = ref<number[]>(generateDates());

    // 当年份或月份变化时，更新日期选项
    watch(
      [selectedYearIndex, selectedMonthIndex],
      () => {
        updateDateOptions();
      },
      { flush: 'post' }
    );

    return () => (
      <div class="date-picker-drawer">
        <div class="date-picker-drawer-header">
          <span class="date-picker-drawer-cancel" onClick={handleCancel}>
            取消
          </span>
          <span class="date-picker-drawer-title">选择日期</span>
          <span class="date-picker-drawer-confirm" onClick={handleConfirm}>
            确定
          </span>
        </div>

        <div class="date-picker-drawer-content">
          <div class="date-picker-drawer-picker">
            {/* 年份选择器 */}
            <div class="date-picker-drawer-column">
              <div class="date-picker-drawer-mask-top"></div>
              <div class="date-picker-drawer-indicator"></div>
              <div class="date-picker-drawer-mask-bottom"></div>
              <Swiper
                direction="vertical"
                slidesPerView={5}
                spaceBetween={0}
                centeredSlides={true}
                loop={false}
                modules={[Mousewheel, Virtual]}
                onSwiper={onYearSwiper}
                onSlideChange={handleYearChange}
                mousewheel={{
                  forceToAxis: true
                }}
                class="date-picker-drawer-swiper"
              >
                {yearOptions.value.map((year, index) => (
                  <SwiperSlide key={year} virtualIndex={index}>
                    <div
                      class={{
                        'date-picker-drawer-item': true,
                        'date-picker-drawer-item--selected': index === selectedYearIndex.value
                      }}
                    >
                      {year}年
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* 月份选择器 */}
            <div class="date-picker-drawer-column">
              <div class="date-picker-drawer-mask-top"></div>
              <div class="date-picker-drawer-indicator"></div>
              <div class="date-picker-drawer-mask-bottom"></div>
              <Swiper
                direction="vertical"
                slidesPerView={5}
                spaceBetween={0}
                centeredSlides={true}
                loop={false}
                modules={[Mousewheel, Virtual]}
                onSwiper={onMonthSwiper}
                onSlideChange={handleMonthChange}
                mousewheel={{
                  forceToAxis: true
                }}
                class="date-picker-drawer-swiper"
              >
                {monthOptions.value.map((month, index) => (
                  <SwiperSlide key={month} virtualIndex={index}>
                    <div
                      class={{
                        'date-picker-drawer-item': true,
                        'date-picker-drawer-item--selected': index === selectedMonthIndex.value
                      }}
                    >
                      {month}月
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* 日期选择器 */}
            <div class="date-picker-drawer-column">
              <div class="date-picker-drawer-mask-top"></div>
              <div class="date-picker-drawer-indicator"></div>
              <div class="date-picker-drawer-mask-bottom"></div>
              <Swiper
                direction="vertical"
                slidesPerView={5}
                spaceBetween={0}
                centeredSlides={true}
                loop={false}
                modules={[Mousewheel, Virtual]}
                onSwiper={onDateSwiper}
                onSlideChange={handleDateChange}
                mousewheel={{
                  forceToAxis: true
                }}
                class="date-picker-drawer-swiper"
              >
                {dateOptions.value.map((date, index) => (
                  <SwiperSlide key={date} virtualIndex={index}>
                    <div
                      class={{
                        'date-picker-drawer-item': true,
                        'date-picker-drawer-item--selected': index === selectedDateIndex.value
                      }}
                    >
                      {date}日
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default DatePickerComponent;
