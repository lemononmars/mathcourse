<script lang="ts">
  import CodeXml from '@lucide/svelte/icons/code-xml';
  import Save from '@lucide/svelte/icons/save';
  import type { CourseSection } from '$lib/course';

  let { section }: { section: CourseSection } = $props();
  let open = $state(false), draft = $state(''), loading = $state(false), saving = $state(false), message = $state('');

  async function toggle() {
    open = !open; message = '';
    if (!open) return;
    loading = true;
    try {
      const response = await fetch(`/__dev/course-content?file=${encodeURIComponent(section.file)}`);
      if (!response.ok) throw new Error(await response.text());
      draft = await response.text();
    } catch (error) { message = error instanceof Error ? error.message : 'Could not load Markdown'; }
    finally { loading = false; }
  }

  async function save() {
    saving = true; message = '';
    try {
      const response = await fetch('/__dev/course-content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ file: section.file, content: draft }) });
      if (!response.ok) throw new Error(await response.text());
      message = 'Saved. Reloading the rendered lesson…';
      setTimeout(() => location.reload(), 350);
    } catch (error) { message = error instanceof Error ? error.message : 'Could not save Markdown'; saving = false; }
  }
</script>

<section class="dev-editor mt-10">
  <button class="btn btn-sm btn-outline" onclick={toggle}><CodeXml size={16}/>{open ? 'Close Markdown editor' : 'Edit this subsection'}</button>
  {#if open}<div class="mt-3 rounded-2xl border border-warning/30 bg-warning/5 p-4"><div class="mb-3 flex flex-wrap items-center justify-between gap-2"><div><div class="text-xs font-black uppercase tracking-wider text-warning">Development only</div><code class="text-xs opacity-60">{section.file}</code></div><button class="btn btn-warning btn-sm" onclick={save} disabled={saving || loading}><Save size={15}/>{saving ? 'Saving…' : 'Save Markdown'}</button></div>{#if loading}<div class="skeleton h-64 w-full"></div>{:else}<textarea class="textarea h-[32rem] w-full resize-y bg-base-100 font-mono text-sm leading-6" bind:value={draft} spellcheck="false" aria-label="Markdown source"></textarea>{/if}{#if message}<p class="mt-2 text-sm">{message}</p>{/if}</div>{/if}
</section>
