<template>
  <div class="add-card">
    <header class="add-header">
      <el-page-header :content="id ? '编辑月卡' : '增加月卡'" @back="$router.back()" />
    </header>
    <main class="add-main">
      <div class="form-container">
        <div class="title">车辆信息</div>
        <div class="form">
          <el-form ref="carInfoForm" :model="carInfoForm" :rules="carInfoRules" label-width="100px">
            <el-form-item prop="personName" label="车主姓名">
              <el-input v-model="carInfoForm.personName" />
            </el-form-item>
            <el-form-item prop="phoneNumber" label="联系方式">
              <el-input v-model="carInfoForm.phoneNumber" />
            </el-form-item>
            <el-form-item prop="carNumber" label="车辆号码">
              <el-input v-model="carInfoForm.carNumber" />
            </el-form-item>
            <el-form-item prop="carBrand" label="车辆品牌">
              <el-input v-model="carInfoForm.carBrand" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="form-container">
        <div class="title">最新一次月卡缴费信息</div>
        <div class="form">
          <el-form ref="feeForm" :model="feeForm" :rules="feeFormRules" label-width="100px">
            <el-form-item prop="validDate" label="有效日期">
              <el-date-picker
                v-model="feeForm.validDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item prop="paymentAmount" label="支付金额">
              <el-input v-model="feeForm.paymentAmount" />
            </el-form-item>
            <el-form-item prop="paymentMethod" label="支付方式">
              <el-select v-model="feeForm.paymentMethod">
                <el-option
                  v-for="item in payMethodList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </main>
    <footer class="add-footer">
      <div class="btn-container">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import { addCarCardApi, getCarCardDetailApi, updateCarCardApi } from '@/api/card'
export default {
  data() {
    return {
      carInfoForm: {
        personName: '', // 车主姓名
        phoneNumber: '', // 联系方式
        carNumber: '', // 车牌号码
        carBrand: '' // 车辆品牌
      },
      carInfoRules: {
        personName: [{ required: true, message: '请输入车主姓名', trigger: 'blur' }],
        phoneNumber: [{ required: true, message: '请输入联系方式', trigger: 'blur' },
        // 正则校验
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }],
        carNumber: [{ required: true, message: '请输入车辆号码', trigger: 'blur' },
          // 自定义校验
          { validator: (rule, value, callback) => {
            const plateNumberRegex = /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/
            if (plateNumberRegex.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的车牌号码'))
            }
          }, trigger: 'blur' }],
        carBrand: [{ required: true, message: '请输入车辆品牌', trigger: 'blur' }]
      },
      feeForm: {
        validDate: '', // 有效日期
        paymentAmount: '', // 支付金额
        paymentMethod: '' // 支付方式
      },
      feeFormRules: {
        validDate: [{ required: true, message: '请输入有效日期', trigger: 'blur' }],
        paymentAmount: [{ required: true, message: '请输入支付金额', trigger: 'blur' }],
        paymentMethod: [{ required: true, message: '请选择支付方式', trigger: 'blur' }]
      },
      payMethodList: [
        {
          id: 'Alipay',
          name: '支付宝'
        },
        {
          id: 'WeChat',
          name: '微信'
        },
        {
          id: 'Cash',
          name: '线下'
        }
      ]
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  created() {
    this.getCarCardDetail()
  },
  methods: {
    async handleSubmit() {
      const vali = await this.$refs.carInfoForm.validate().catch(() => false)
      if (!vali) return
      const validationResults = await Promise.allSettled([
        this.$refs.carInfoForm.validate(),
        this.$refs.feeForm.validate()
      ]).catch(() => false)
      if (validationResults.every(result => result.status === 'rejected')) return
      const { validDate, ...resetFeeForm } = this.feeForm
      const addParams = {
        ...this.carInfoForm,
        ...resetFeeForm,
        cardStartDate: validDate[0],
        cardEndDate: validDate[1]
      }
      this.id ? await updateCarCardApi(addParams) : await addCarCardApi(addParams)
      this.$message.success(this.id ? '编辑成功' : '新增月卡成功')
      this.$router.back()
    },
    resetForm() {
      // resetFields只能清空加了prop的表单字段
      this.$refs.carInfoForm.resetFields()
      this.$refs.feeForm.resetFields()
    },
    async getCarCardDetail() {
      if (!this.id) return
      const { data } = await getCarCardDetailApi(this.id)
      // 车辆信息
      const { personName, phoneNumber, carNumber, carBrand, carInfoId } = data
      this.carInfoForm = { personName, phoneNumber, carNumber, carBrand, carInfoId }
      // 最新一次月卡缴费信息
      const { rechargeId, cardStartDate, cardEndDate, paymentAmount, paymentMethod } = data
      this.feeForm = {
        rechargeId,
        validDate: [cardStartDate, cardEndDate],
        paymentAmount,
        paymentMethod
      }
    }
  }
}
</script>

<style scoped lang="scss">
.add-card {
  background-color: #f4f6f8;
  height: 100vh;

  .add-header {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 64px;
    background-color: #fff;

    .left {
      span {
        margin-right: 4px;
      }
      .arrow{
        cursor: pointer;
      }
    }

    .right {
      text-align: right;
    }
  }

  .add-main {
    background: #f4f6f8;
    padding: 20px 130px;

    .form-container {
      background-color: #fff;

      .title {
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
      }

      .form {
        margin-bottom: 20px;
        padding: 20px 65px 24px;

        .el-form {
          display: flex;
          flex-wrap: wrap;

          .el-form-item {
            width: 50%;
          }
        }
      }
    }
    .preview{
      img{
        width: 100px;
      }
    }
  }

  .add-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 24px 50px;
    color: #000000d9;
    font-size: 14px;
    background: #fff;
    text-align: center;
  }
}
</style>
