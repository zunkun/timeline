<template>
  <div id="calendar">
    <Header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>日历管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{typeMap[calendarType]}}</el-breadcrumb-item>
      </el-breadcrumb>
    </Header>
    <div class="calendar-area">
       <FullCalendar 
        defaultView="dayGridMonth" 
         ref="calendar"
        :plugins="plugins"  
        :locale="zhLocale"
        :fixedWeekCount="false"
        :header="calendarHeader"
        :height = "height"
        :minTime="'06:00:00'"
        :selectable="true"
        :events="events"
        @select="selectTime"
        @datesRender="datesRender"
        @eventClick="editEvent"
        @dateClick="showEventView"
        />
    </div>
    <el-dialog
      :visible.sync="eventVisible"
      width="50%"
      >
      
      <el-form ref="eventForm" :model="event" :rules="rules" label-width="60px">
        <el-form-item label="主题" prop="title">
          <el-input v-model="event.title" placeholder="请输入主题"></el-input>
        </el-form-item>
        <el-form-item label="时间">
            <el-date-picker
              type="datetimerange"
              v-model="event.timerange"
              format="yyyy-MM-dd HH:mm"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="地点">
          <el-input v-model="event.location" placeholder="请输入地点"></el-input>
        </el-form-item>
        <el-form-item label="颜色" prop="color">
          <el-input placeholder="输入颜色" v-model="event.color" class="color-i">
            <template slot="append">
              <el-color-picker v-model="event.color" class="color-p"></el-color-picker>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="说明">
          <el-input type="textarea" v-model="event.description" :rows="3"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button plan size="small" @click="eventVisible = false">取 消</el-button>
        <el-button type="danger" plan size="small" @click="deleteEvent" v-if="event.id">删 除</el-button>
        <el-button type="success" plain size="small" @click="saveEvent">确 定</el-button>
      </span>
</el-dialog>
  </div>
</template>



<script>
import Header from '../components/Header';
import FullCalendar from '@fullcalendar/vue'
import daygrid from '@fullcalendar/daygrid'
import timegrid from '@fullcalendar/timegrid'
import interaction from '@fullcalendar/interaction'
import zhLocale from '@fullcalendar/core/locales/zh-cn';


export default {
  name: 'calendar',
  components: { Header, FullCalendar },
  data() {
    return {
      baseUrl: '/tasks/api/events',
      zhLocale,
      plugins: [daygrid,timegrid, interaction],
      height:660,
      calendarHeader: {
        left: 'today,prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      typeMap: {
        'dayGridMonth': '月视图',
        'timeGridWeek': '周视图',
        'timeGridDay': '日视图'
      },
      calendarType: 'dayGridMonth',
      eventVisible: false,
      event: {
        title: '',
        timerange: '',
        color: '#158744',
        description: '',
        start: '',
        end: '',
      },
      rules: {
          title: [{
              required: true,
              message: '请输入主题',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur'
            }
          ],
          color: [{
            required: true,
            message: '输入颜色',
            trigger: 'blur'
          }, {
            type: 'string',
            pattern: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
            message: '请输入正确的hex颜色值',
            trigger: 'blur'
          }]
        },

        events: [],
    }
  },
  methods: {
    editEvent(arg) {
      let event = arg.event;
      this.event = {
        id: Number(event.id),
        title: event.title,
        color: event['backgroundColor'],
        start: event.start,
        end: event.end,
        timerange: [event.start, event.end]
      }
      this.eventVisible = true;
    },
    showEventView(arg) {
      this.eventVisible = true;
      let date = new Date();
      let hours = date.getHours()
      let minutes = date.getMinutes()
      let seconds = date.getSeconds()

      let targetDate = arg.date;
      targetDate.setHours(hours, minutes, 0, 0);
      let targetTimeStamp = targetDate.getTime()

      if(minutes >= 30) {
        targetTimeStamp += (60 - minutes) * 60 * 1000
      } else {
        targetTimeStamp += (30 - minutes) * 60 * 1000
      }

      this.initEvent()
      this.event.timerange = [new Date(targetTimeStamp), new Date(targetTimeStamp + 60 *60 * 1000)]

    },

    initEvent() {
      this.event = {
        title: '',
        timerange: '',
        color: '#158744',
        description: '',
        start: '',
        end: '',
      };
    },

    deleteEvent() {
      fetch(`${this.baseUrl}/${this.event.id}`, {
          method: 'DELETE',
      }).then(res =>{
        if(res.ok) {
            let index = this.events.findIndex((value) =>{
              return Number(value.id) === Number(this.event.id);
            });
            if(index === -1) {
              return;
            }
            this.initEvent()
            this.$delete(this.events, index)
            this.eventVisible = false;
        }
      })
    },

    saveEvent() {
      this.$refs.eventForm.validate(valid => {
        if (!valid) {
          return;
        }
        let method = 'POST';
        let url = `${this.baseUrl}/`;
        if (this.event.id) {
          url = `${url}${this.event.id}`
          method = 'PUT';
        }
        this.event.start = this.event.timerange[0]
        this.event.end = this.event.timerange[1]
        fetch(url, {
          method,
          body: JSON.stringify(this.event),
          headers: {
            'content-type': 'application/json'
          },
        }).then(async (res) => {
          if(!res.ok) {
            return;
          }
          if(!this.event.id) {
            this.event = await res.json();
            this.events.push({
              id: this.event.id,
              title: this.event.title,
              start: this.event.start,
              end: this.event.end,
              backgroundColor: this.event.color,
            });
          } else {
            let index = this.events.findIndex((value) =>{
              return Number(value.id) === Number(this.event.id);
            });
            if(index === -1) {
              return;
            }
            this.$set(this.events, index, this.event)
          }
          this.initEvent();
          this.eventVisible = false;
        })
      });
    },

    datesRender() {
     let calendar =  this.$refs.calendar.getApi();
     this.getEvents(calendar.getDate(), calendar.state.viewType)
    },

    getEvents(date= new Date(), type='dayGridMonth') {
        fetch(`${this.baseUrl}/?type=${type}&timestamp=${date.getTime()}`).then(async (res) =>{
        if(res.ok) {
          this.calendarType = type;
          let events = await res.json()
          this.events = events;
          if(type === 'dayGridMonth') {
            if(!this.events.length) {
              this.height = 560;
            } else {
              this.height = 640;
            }
          } else {
            this.height = 0;
          }
        }
      })
    },

    selectTime(arg) {
      this.initEvent()
      this.event.timerange = [arg.start, arg.end]
      this.eventVisible = true;
    }
  },
  created() {

  }
}
</script>

<style>
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';


.calendar-area {
  padding: 10px 20px;
}

.fc-today-button {
  cursor: pointer;
  background-color: transparent !important;
  color:black !important;
}
.fc-button-primary {
  background-color: #fff;
  border: 1px solid #dadce0;
}

.fc-button-primary:hover {
  background-color: rgb(240, 249, 235);
  border: 1px solid #dadce0;
  color:black !important;
}

.fc-button-primary:disabled {
  background-color: #ccc;
  border: none;
}

.fc-button-primary:focus {
  box-shadow: none !important;
}

.fc-button:focus {
  background: #67C23A !important;
}

.fc-button {
  color:green;
}

/* .fc-icon {
  color:black;
} */

.fc-button-active {
  background-color: #67C23A !important;
  border-color: #fff !important;
  box-shadow:none;
}


  .el-color-picker__color {
    border: 1px;
  }
  
  .el-color-picker__trigger {
    padding: 0;
    border: none;
  }
  .color-d {
    height: 24px;
    cursor: pointer;
    border-radius: 2px;
  }

  .el-input-group__append,
  .el-input-group__prepend {
    padding: 0;
    background-color: #fff;
    border: none;
  }

  .el-range-editor.el-input__inner {
    width:100% !important;
  }

</style>

