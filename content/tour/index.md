---
title: UNIC Research Group
date: 2022-10-24

type: landing

sections:
  - block: slider
    content:
      slides:
      - title: <div style="user-select:none;">6G与未来智能无线网络</div>
        content: <div style="margin-top:60px; margin-bottom:40px; font-size:12pt; width:72%; min-width:150px; height:180px; color:#fff; text-indent:2em;"><div style="display:inline-block; position:relative; top:50%; -webkit-transform:translateY(-50%);user-select:none;"><p>通过人工智能及深度学习技术实现网络智慧内生，AI能力的全网渗透，快速、自动、智能地对网络各方面进行高效管控，包括规划、管理、优化以及康复等，有效满足不断出现的新需求，使能资源管理的智慧决策，降低成本并提高效率。</p><p style="margin-top:-1.2vh;">研究内容包括：基于图神经网络的快速网络部署，知识驱动的网络资源调配，知识图谱赋能的网络管控，动态神经模型与按需服务技术，大模型与预训练模型在网络中的应用，可解释人工智能的网络应用，多智能体强化学习无人机集群对抗，数字孪生驱动的强化学习，智能测试方法等</p></div></div>
        align: left
        background:
          image:
            filename: ai.png
            filters:
              brightness: 0.5
          position: center
          color: '#fff'
      - title: <div style="user-select:none;">空天地一体化网络</div>
        content: <div style="margin-top:60px; margin-bottom:40px; font-size:12pt; width:65%; height:180px; color:#fff; text-indent:2em;"><div style="display:inline-block; position:relative; top:50%; -webkit-transform:translateY(-50%);user-select:none;"><p>空天地一体化网络可为陆海空天用户提供无缝信息服务，满足未来网络对于全时全域全空通信和网络互联互通的需求，是6G网络的重要组成部分。</p><p>主要研究空天地一体化网络协议架构设计、网络切片方法、网络虚拟化与虚拟资源调度，网络仿真方法等。可参考论文：《空天地一体化网络技术：探索与展望》</p></div></div>


                
        align: left
        background:
          image:
            filename: coders.jpg
            filters:
              brightness: 0.7
          position: right
          color: '#fff'
      - title: <div style="user-select:none;">车联网与自动驾驶技术</div>
        content: <div style="margin-top:60px; margin-bottom:40px; font-size:12pt; width:65%; height:180px; color:#fff; text-indent:2em;"><div style="display:inline-block; position:relative; top:50%; -webkit-transform:translateY(-50%);user-select:none;"><p>车联网是指通过应用传感技术、通信技术、网络技术、智能技术、感知与控制技术等，有机地融合在车辆和交通道路管理体系中而建成的一种实时、智能、高效的综合交通管理系统，是能够实现智能化交通管理、智能动态信息服务和自动驾驶的一体化网络。</p><p>研究方向包括：车联网低时延高可靠技术，基于信息年龄和信息价值的调度技术，网络切片技术，模型和数据双驱动网络优化技术，车路协同技术</p></div></div>
        align: left
        background:
          image:
            filename: iov.png
            filters:
              brightness: 0.7
          position: center
          color: '#fff'
          
      - title: <div style="user-select:none;">电磁空间智能孪生及其应用</div>
        content: <div style="margin-top:60px; margin-bottom:40px; font-size:12pt; width:65%; height:180px; color:#fff; text-indent:2em;"><div style="display:inline-block; position:relative; top:50%; -webkit-transform:translateY(-50%);user-select:none;"><p>电磁空间智能孪生依托数字建模、智能感知与闭环推演，构建电磁频谱的高保真系统，融合通信、雷达、感知、计算与对抗多维信息，实现电磁环境的可视呈现、精准建模、实时推演。该技术能够复现复杂动态的电磁环境演化过程，对信号分布、干扰态势、频谱占用状态进行动态感知与仿真复现。</p><p style="margin-top:-1.2vh;">在民用领域，可支撑无线通信网络规划优化、复杂城市环境下频谱资源管理、车联网与物联网电磁环境评估；在国防与安全领域，用于电磁态势感知、电子对抗仿真推演、雷达组网效能评估、复杂场景电磁风险预演，为频谱管控、策略研判与系统效能验证提供重要技术支撑。</p></div></div>
        align: left
        background:
          image:
            filename: dianci.png
            filters:
              brightness: 0.7
          position: center
          color: '#fff'
    design:
      # Slide height is automatic unless you force a specific height (e.g. '400px')
      slide_height: '600px'
      is_fullscreen: false
      # Automatically transition through slides?
      loop: true
      # Duration of transition between slides (in ms)
      interval: 6000
      parallax: true

  - block: portfolio

    # Order that this section appears on the page.
    weight: 20

    content:
      title: <div style="margin-bottom:1em; margin-top:-0.5em;"><a href="../post/" style="color:black; text-decoration:inherit;">新闻</a></div>
      # Page type to display. E.g. project.
      # page_type: post

      # Default filter index (e.g. 0 corresponds to the first `filter_button` instance below).
      filter_default: 0
      filters:
        folders:
          - post
        # All set tags: report, event, paper, internship, forum, contest， news
        exclude_tags: [expired]
        tags: [paper, internship, forum, contest, people, news]
        kinds:
          - page
      count: 9
      sort_by: 'date'
      sort_ascending: false

    design:
      columns: '1'
      view: masonry
      flip_alt_rows: true
      background: {}
      # spacing: {padding: [20px, 20px, 20px, 20px]}

  - block: collection

    content:
      title: <div style="margin-bottom:1em; margin-top:-0.5em;"><a href="../work/" style="color:black; text-decoration:inherit;">科研成果</a></div>
      # Choose how many pages you would like to display (0 = all pages)
      count: 3
      # Filter on criteria
      filters:
        # The folders to display content from
        folders:
          - work
        author: ""
        category: ""
        tag: ""
        publication_type: ""
        featured_only: false
        exclude_featured: false
        exclude_future: false
        exclude_past: false
      # Choose how many pages you would like to offset by
      # Useful if you wish to show the first item in the Featured widget
      offset: 0
      # Field to sort by, such as Date or Title
      sort_by: 'content_id'
      sort_ascending: true

    design:
      # Choose a listing view
      view: Showcase
      # Choose single or dual column layout
      columns: '1'
      flip_alt_rows: false
---

