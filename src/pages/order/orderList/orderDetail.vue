<template>
  <div class="detailBox">
    <t-card :bordered="false">
      <t-steps class="step-container" current="false" status="process">
        <t-step-item title="填写转账信息" content="" />
        <t-step-item title="确认转账信息" content="" />
        <t-step-item title="完成" content="" />
        <t-step-item title="完成" content="" />
      </t-steps>
    </t-card>
    <!-- 订单信息 -->
    <div class="Card bg-wt">
      <div class="title">订单信息</div>
      <div class="bodyBox">
        <div class="tagBox">
          <div class="leftBox">
            <div class="tag">订单编号</div>
            <div class="content">2</div>
          </div>
          <div class="rightBox">
            <div class="tag">预约上门时间</div>
            <div class="content">2</div>
          </div>
        </div>
        <div class="tagBox">
          <div class="leftBox">
            <div class="tag">客户姓名</div>
            <div class="content">2</div>
          </div>
          <div class="rightBox">
            <div class="tag">地址</div>
            <div class="content">2</div>
          </div>
        </div>
        <div class="tagBox">
          <div class="leftBox">
            <div class="tag">服务项名称</div>
            <div class="content">2</div>
          </div>
          <div class="rightBox">
            <div class="tag">订单金额</div>
            <div class="content">2</div>
          </div>
        </div>
        <div class="tagBox">
          <div class="leftBox">
            <div class="tag">服务人员</div>
            <div class="content">2</div>
          </div>
          <div class="rightBox">
            <div class="tag">客户电话</div>
            <div class="content">2</div>
          </div>
        </div>
      </div>
    </div>
    <!-- end -->
    <!-- 支付记录 -->
    <div class="Card bg-wt">
      <div class="title">支付记录</div>
      <div class="bodyBox">
        <div class="tagBox">
          <div class="leftBox">
            <div class="tag">交易状态</div>
            <div class="content">2</div>
          </div>
          <div class="rightBox">
            <div class="tag">支付渠道</div>
            <div class="content">2</div>
          </div>
        </div>
        <div class="tagBox">
          <div class="leftBox">
            <div class="tag">支付方式</div>
            <div class="content">2</div>
          </div>
          <div class="rightBox">
            <div class="tag">微信支付订单号</div>
            <div class="content">2</div>
          </div>
        </div>
        <div class="tagBox">
          <div class="leftBox">
            <div class="tag">支付方式</div>
            <div class="content">2</div>
          </div>
        </div>
      </div>
    </div>
    <!-- end -->
    <div class="Card bg-wt">
      <div class="title">服务记录</div>
      <div class="bodyBox">
        <div class="tagBox">
          <div class="tag">退款状态</div>
          <div class="content">2</div>
        </div>
        <div class="tagBox">
          <div class="tag">开始服务图片</div>
          <div class="content">
            <t-image-viewer
              :images="[item]"
              v-for="(item, index) in imgList"
              :key="index"
            >
              <template #trigger="{ open }">
                <div class="tdesign-demo-image-viewer__ui-image">
                  <img
                    alt="test"
                    :src="item"
                    class="tdesign-demo-image-viewer__ui-image--img"
                  />
                  <div
                    class="tdesign-demo-image-viewer__ui-image--hover"
                    @click="open"
                  >
                    <span><ZoomInIcon size="1.8em" /> </span>
                  </div>
                </div>
              </template>
            </t-image-viewer>
          </div>
        </div>
        <div class="tagBox">
          <div class="tag">开始结束时间</div>
          <div class="content">2</div>
        </div>
        <div class="tagBox">
          <div class="tag">结束服务图片</div>
          <div class="content">
            <t-image-viewer
              :images="[item]"
              v-for="(item, index) in imgList"
              :key="index"
            >
              <template #trigger="{ open }">
                <div class="tdesign-demo-image-viewer__ui-image">
                  <img
                    alt="test"
                    :src="item"
                    class="tdesign-demo-image-viewer__ui-image--img"
                  />
                  <div
                    class="tdesign-demo-image-viewer__ui-image--hover"
                    @click="open"
                  >
                    <span><ZoomInIcon size="1.8em" /> </span>
                  </div>
                </div>
              </template>
            </t-image-viewer>
          </div>
        </div>
      </div>
    </div>
    <!-- 退款记录 -->
    <div class="Card bg-wt">
      <div class="title">退款记录</div>
      <div class="bodyBox">
        <div class="tagBox">
          <div class="leftBox">
            <div class="tag">退款状态</div>
            <div class="content">2</div>
          </div>
          <div class="rightBox">
            <div class="tag">申请人</div>
            <div class="content">2</div>
          </div>
        </div>
        <div class="tagBox">
          <div class="leftBox">
            <div class="tag">申请时间</div>
            <div class="content">2</div>
          </div>
          <div class="rightBox">
            <div class="tag">微信支付订单号</div>
            <div class="content">2</div>
          </div>
        </div>
        <div class="tagBox">
          <div class="leftBox">
            <div class="tag">支付方式</div>
            <div class="content">2</div>
          </div>
          <div class="rightBox">
            <div class="tag">退款原因</div>
            <div class="content">2</div>
          </div>
        </div>
        <div class="tagBox">
          <div class="leftBox">
            <div class="tag">退款渠道</div>
            <div class="content">2</div>
          </div>
          <div class="rightBox">
            <div class="tag">退款方式</div>
            <div class="content">2</div>
          </div>
        </div>
        <div class="tagBox">
          <div class="leftBox">
            <div class="tag">微信支付退款单号</div>
            <div class="content">2</div>
          </div>
          <div class="rightBox">
            <div class="tag">退款金额</div>
            <div class="content">2</div>
          </div>
        </div>
      </div>
    </div>
    <!-- end -->
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { ZoomInIcon } from 'tdesign-icons-vue-next'

const imgList = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg'
]
</script>

<style lang="less" scoped>
.detailBox {
  :deep(.t-card__body) {
    padding: 20px 36px;
  }
  .Card {
    margin-top: 25px;
    padding: 36px 49px;
    .title {
      color: var(--color-bk1);
      font-weight: 600;
      font-size: 18px;
      color: #191919;
    }
    .bodyBox {
      .tagBox {
        display: flex;
        margin-top: 30px;
        font-size: 14px;
        width: 100%;
        .leftBox,
        .rightBox {
          width: 50%;
          display: flex;
        }
        .rightBox{
          padding-left: 50px;
        }
        .tag {
          width: 172px;
          color: var(--color-bk3);
        }
        .content {
          color: var(--color-bk1);
          width: 54%;
          :deep(.tdesign-demo-image-viewer__ui-image) {
            width: 100px;
            height: 100px;
            margin-right: 16px;
          }
        }
      }
    }
  }
}
</style>
